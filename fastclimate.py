# -*- coding: utf-8 -*-

"""
fastclimate

simple climate model
"""

# --- imports

# std lib imports:
import json
import os
import sys

# third party imports:
import numpy as np

# --- global variables

# define default parameters:
DEFAULTS = {
    #  model run time (years):
    'tmax': 10,
    #  plot only last plotyears (years):
    'plotyears': 3,
    #  jpeg compaction 10-95 useful range:
    'plotquality': 75,
    #  this model run will be compared with one
    #  other previous run:
    'comparewith': '35yearstandard.json',
    #  name to use for later comparison
    #  'nosave' = no file saved:
    'saveas': 'nosave',
    # offset initial conditions ...
    # initial temperature offsets (^oC)
    # (Tocean<freezing will be adjusted):
    'toffset': 0,
    # initial ice thickness offsets (m)
    # (hi<0 will be adjusted) 13.65 is threshold:
    'iceoffset': 0,
    # Simulated CO2 concentration time today's concentration (1=today):
    'co2': 1.0,
    # albedos ...
    # albedo of snow-covered land surfaces (except Antarctica):
    'albsnow': 0.73,
    # albedo of surface in Antarctica (higher because no trees):
    'albsnowant': 0.85,
    # typical non-ice land albedo:
    'albbare': 0.15,
    # ice-free ocean albedo:
    'albonoice': 0.08,
    # thick ice albedo cold season albedo:
    'alboicewin': 0.75,
    # thick ice summer albedo:
    'alboicesum': 0.65,
    # atmosphere and cloud albedo:
    'albatm': 0.26,
    # atmosphere and cloud sw absorption parameter:
    'absair': 0.18,
    # horizontal advection (ocean latitude variations set in intialization
    # arrays ...
    # horizontal advection parameter for atmosphere  (J lat2/s/m2/K):
    'Kha': 1100,
    # horizontal advection parameter for ocean (J lat2/s/m2/K)
    # (doesn't depend on mixed layer depth):
    'Kho1': 300,
    # efficiency ice transfer factor applied to all lats (m3K/J)
    # used to apply Khom to ice:
    'Khicefactor': 3.3e-08,
    # Vertical advection (convection) ...
    # lower cutoff for deltaT for convective transfer (K):
    'Va1': 26.0,
    # vertical advection transfer coefficient (J/s/m2/K):
    'Kva': 35.0,
    # ice parameters (albedo defined above) ...
    # thick ice vertical heat transfer coefficient
    # (J/s/m/K) includes snow + lead effect:
    'Kicethick': 0.8,
    # thin ice vertical heat transfer coefficient (J/s/m/K)
    # assume no snow:
    'Kicethin': 2.0,
    # no albedo or heat heat transfer coefficient changes at
    # thicker ice (m):
    'zicethick': 0.5,
    # equivalent open water in pack ice:
    'leadfraction': .05,
    # radiation parameters ...
    # solar constant (J/s/m2):
    'sc': 1365,
    # top upper (going up) atmospheric emissivity
    # (Close to 500 mb?):
    'epsua1': 0.90,
    # bottom upper (going down) atmospheric emissivity
    # (higher with clouds):
    'epsba1': 1.22,
    # total atmosphere LW absorptivity (should equal epsua1?):
    'epsa1': 0.945,
    # surface/ABL emmissivity:
    'epssfc': 1.0,
    # Surface/ABL heat capacities ...
    # ABL heat capacity with includes soil (J/m2/K)  Higher than
    # actual to prevent numerical instability:
    'Csl': 4e6,
    # ABL heat capacity alone (or with snow surface) (J/m2/K):
    'Css': 2e6,
    # Land snow parameters
    # (between these temps albedo and heat capacity transition
    #  from snow to bare values) ...
    # Temperature below which surface assumed totally covered
    # with snow:
    'Tsnowtotal':  269,
    # Temperature above which surface assumed totally snow-free:
    'Tsnowstart':  278,
    # Ocean parameters ...
    # ocean mixed layer depth (m):
    'hocean': 50,
    # ocean flux from below mixed layer (J/s/m2) (not conserved):
    'qocean1': 2,
    # timestep (days):
    'dtday': 1,
    # save every savestep points for plotting:
    'savestep': 10
}

# directory contianing data files:
DATA_DIR = 'data'
# data files to load:
DATA_FILES = {
    'area10': 'area10.json',
    'swtop': 'swtop.json',
    'tinit_2co2': 'tinit_2co2.json',
    'tinit': 'tinit.json'
}
# data gets stored here:
DATA = {}
COMPAREWITH = {}

# --- functions


def load_data(data_dir, data_files):
    data = {}
    for var in data_files.keys():
        data_file = data_files[var]
        data_path = os.sep.join([data_dir, data_file])
        with open(data_path, 'r') as data_json:
            data[var] = json.load(data_json)
    return data

def run_fastclimate(options=None, data=None, comparewith=None):
    """
    Run fastclimate model
    """
    # if no options provided, use globally defined defaults:
    if not options:
        options = DEFAULTS
    # if no data provided ... :
    if not data:
        # if no global data stored ... :
        if not DATA:
            # load default data files:
            data = load_data(DATA_DIR, DATA_FILES)
            # for each data variable ... :
            for var in data.keys():
                # convert to numpy array and store:
                DATA[var] = np.array(data[var])
    # use data from global DATA variable once data is loaded:
    data = DATA

    # if no comparison data provided ... :
    if not comparewith:
        # if no global data stored ... :
        if not COMPAREWITH:
            # load default version:
            comparewith = load_data(
                DATA_DIR, {'comparewith': options['comparewith']}
            )['comparewith']
            # convert comparison data to numpy arrays:
            for var in comparewith.keys():
                if type(comparewith[var]) == list:
                    COMPAREWITH[var] = np.array(comparewith[var])
                else:
                    COMPAREWITH[var] = comparewith[var]
    # use data from global COMPAREWITH variable once data is loaded:
    comparewith = COMPAREWITH

    # create initialisation variables,
    # f(latitude) here assumes 10-deg lat steps ...
    # ocean area by lat array (%):
    area10 = data['area10']
    # shortwave radiation at top of atmos (W/m2):
    swtop = data['swtop']
    # upper air, surface, ocean mixed layer,  ocean(ice) surface temps,
    # ice thickness
    # create by [Ta Tsland Tocean Tsocean hi]
    if options['co2'] == 2:
        tinit = data['tinit_2co2']
    else:
        tinit = data['tinit']

    # model parameters:
    it = 0
    iit = -1
    # degrees to radians:
    dtr = np.pi / 180
    # latitude change (degrees):
    dl = 10
    firstl = -90 + (dl / 2)
    lastl = 90 - (dl / 2)
    # latitude (degrees):
    l = np.arange(firstl, lastl + dl, dl)
    # latitude steps:
    nl = len(l)
    nlm1 = nl - 1
    n = np.arange(1, nl + 1)
    nm1 = np.arange(1, nlm1 + 1);
    # time step (years):
    dt = options['dtday'] / 365
    # time step (secs):
    dtsec = dt * 3600 * 24 * 365
    # initial start counter:
    it = 0





# ---

def main():
    run_fastclimate()

if __name__ == '__main__':
    main()

# ---

