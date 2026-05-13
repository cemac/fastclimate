# -*- coding: utf-8 -*-

"""
fastclimate

simple climate model
"""

# --- imports

# std lib imports:
import json
import os

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
###     'plotquality': 75,
    #  this model run will be compared with one
    #  other previous run:
    'comparewith': '35yearstandard.json',
    #  name to use for later comparison
    #  'nosave' = no file saved:
###     'saveas': 'nosave',
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
    """
    load data from a list of json files
    """
    data = {}
    for var, data_file in data_files.items():
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
    if data is not None:
        # load provided data. for each data variable ... :
        for var, value in data.items():
            # convert to numpy array and store:
            DATA[var] = np.array(value)
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
    if comparewith is not None:
        # convert comparison data to numpy arrays:
        for var, value in comparewith.items():
            if isinstance(value, list):
                COMPAREWITH[var] = np.array(value)
            else:
                COMPAREWITH[var] = value
    # use data from global COMPAREWITH variable once data is loaded:
    comparewith = COMPAREWITH

    # set variables from options:
    tmax = options['tmax']
    plotyears = options['plotyears']
###     plotquality = options['plotquality']
    comparewith = options['comparewith']
###     saveas = options['saveas']
    toffset = options['toffset']
    iceoffset = options['iceoffset']
    co2 = options['co2']
    albsnow = options['albsnow']
    albsnowant = options['albsnowant']
    albbare = options['albbare']
    albonoice = options['albonoice']
    alboicewin = options['alboicewin']
    alboicesum = options['alboicesum']
    albatm = options['albatm']
    absair = options['absair']
    Kha = options['Kha']
    Kho1 = options['Kho1']
    Khicefactor = options['Khicefactor']
    Va1 = options['Va1']
    Kva = options['Kva']
    Kicethick = options['Kicethick']
    Kicethin = options['Kicethin']
    zicethick = options['zicethick']
    leadfraction = options['leadfraction']
    sc = options['sc']
    epsua1 = options['epsua1']
    epsba1 = options['epsba1']
    epsa1 = options['epsa1']
    epssfc = options['epssfc']
    Csl = options['Csl']
    Css = options['Css']
    Tsnowtotal = options['Tsnowtotal']
    Tsnowstart = options['Tsnowstart']
    hocean = options['hocean']
    qocean1 = options['qocean1']
    dtday = options['dtday']
    savestep = options['savestep']

    # create initialisation variables,
    # f(latitude) here assumes 10-deg lat steps ...
    # ocean area by lat array (%):
    area10 = data['area10']
    # shortwave radiation at top of atmos (W/m2):
    swtop = data['swtop']
    # upper air, surface, ocean mixed layer,  ocean(ice) surface temps,
    # ice thickness
    # create by [Ta Tsland Tocean Tsocean hi]
    if co2 == 2:
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
    nm1 = np.arange(1, nlm1 + 1)
    # time step (years):
    dt = dtday / 365
    # time step (secs):
    dtsec = dt * 3600 * 24 * 365
    # initial start counter:
    it = 0

    # areas
    # convert % to fraction:
    ocarea = area10 / 100
    # approx relative area of each zone:
    area = np.cos(dtr * l)
    arearat = area[0:nlm1] / area[1:]
    area1 = ocarea[0:nlm1] * area[0:nlm1]
    area2 = ocarea[1:] * area[1:]
    iblock = np.where((area1 == 0) | (area2 == 0))
    inoblock = np.where((area1 > 0) & (area2 > 0))
    ocarearat = np.zeros(area1.shape)
    ocarearat[iblock] = 0
    ocarearat[inoblock] = area1[inoblock] / area2[inoblock]

    # horizontal advection boundaries
    # no flux from outside B.C.:
    qwall = np.zeros((nl))
    qas = np.zeros((nl))
    qan = np.zeros((nl))
    qos = np.zeros((nl))
    qon = np.zeros((nl))
    qis = np.zeros((nl))
    qin = np.zeros((nl))

    # constants (at least assumed so here)
    # upper atmospheric bulk heat capacity per m2 (J/m2/K):
    Ca = 9.352e6
    # liquid ocean volumetric heat capacity (J/m3/K):
    Cov = 4.18e6
    # Freezing temperature at top of ice (K):
    Tfreezetop = 273.16
    # Freezing temperature of ocean (K):
    Tfreezebot = 273.16 - 1.7
    # Latent heat of fusion * ice density (J/m3):
    lvrho = 3.34e8
    # Planck's constant (J/s/m2/K4):
    sigma=5.67e-8

    # parameters derived from above
    # Kha normalized by lat step (J/s/m2/K):
    Khan = Kha / (dl ** 2)
    # make scalar an array:
    Kho = Kho1 * np.ones(nm1.shape)
    # Fram Strait / Bering strait bottleneck to isolate Arctic Ocean
    # (J lat2/s/m2/K):
    Kho[15] = Kho[15] * 0.2
    # Kho normalized by lat step (J/s/m2/K):
    Khon = Kho / (dl ** 2)
    # horizontal advection parameter for ice (lat2/s):
    Khice = Kho * Khicefactor
    # Khice normalized by lat step (1/s):
    Khicen = Khice / (dl ** 2)
    # change solar radiation if sc different from 1365:
    swtop = swtop * (sc / 1365)
    # ocean mixed layer bulk heat capacity (J/m2/K):
    Cocean = Cov * hocean
    # ocean flux from below mixed layer (J/s/m2) (not conserved):
    qocean = qocean1 * np.ones(n.shape)
    # magnitude of snow transition region temperature (K):
    Tsnowrange = Tsnowstart - Tsnowtotal

    # co2-changed emissivities just used values that gave 2-5 C changes
    # top upper atmospheric emissivity  (Close to 500 mb?):
    epsua = epsua1 - (co2 - 1) * .015
    # bottom upper atmospheric emissivity (higher with clouds):
    epsba = epsba1 + (co2 - 1) * .015
    # total atmosphere LW absorptivity:
    epsa = epsa1 + (co2 - 1) * .006

    # set offset to initial prognostic variables:
    Ta = tinit[0] + toffset
    Tsland = tinit[1] + toffset
    Tocean = tinit[2] + toffset
    Tsocean = tinit[3] + toffset
    hi = tinit[4] + iceoffset

    # adjust initial sea temps and ice thickness
    # prevent below freezing sea temp:
    ifreeze = np.where(Tocean < Tfreezebot)
    Tocean[ifreeze] = Tfreezebot
    # prevent negative ice thickness:
    inegice = np.where(hi < 0)
    hi[inegice] = 0.0
    # latitudes where antarctic snow albedo applied:
    nantsnow = [0, 1]

    # automatic input corrections
    # too large time step causes numerical instability:
    dtday = min(dtday, 1)
    # must be integer for proper plotting:
    tmax = np.ceil(tmax)
    # model must run for at least 2 years:
    tmax = max(tmax, 2)
    # too large savestep causes plotting problems:
    if (savestep * dtday) > 40:
        savestep = 40 / dtday
    # save counter must be an integer:
    savestep = np.ceil(savestep)
    # plot period can't be longer than model run:
    if plotyears > tmax:
        tmax = np.ceil(plotyears)
    # must have at least two plot points:
    if (plotyears * 180) < savestep:
        plotyears = 1

    # time step range and number of savesteps:
    t_range = np.arange(0, tmax + dt, dt)
    s_steps = len([
        i for i in range(t_range.size) if i % savestep == 0
    ])
    # allocate output arrays:
    tt = np.ones((s_steps)) * np.nan
    TT = np.ones((s_steps, n.size)) * np.nan
    TTsland = np.ones((s_steps, n.size)) * np.nan
    TTocean = np.ones((s_steps, n.size)) * np.nan
    TTsocean = np.ones((s_steps, n.size)) * np.nan
    TTsavg = np.ones((s_steps, n.size)) * np.nan
    Qs = np.ones((s_steps, n.size)) * np.nan
    Qa = np.ones((s_steps, n.size)) * np.nan
    Qatm = np.ones((s_steps, n.size)) * np.nan
    Qice = np.ones((s_steps, n.size)) * np.nan
    Qall = np.ones((s_steps, n.size)) * np.nan
    Qmelt = np.ones((s_steps, n.size)) * np.nan
    Albocean = np.ones((s_steps, n.size)) * np.nan
    Lw = np.ones((s_steps, n.size)) * np.nan
    Alpha = np.ones((s_steps, n.size)) * np.nan
    Hi = np.ones((s_steps, n.size)) * np.nan

    # -- start main model loop


    # starts at NH vernal equinox:
    for t in t_range:
        # Upper atmosphere fluxes
        # advection fluxes:
        qwall[:nlm1] = Khan * (Ta[:nlm1] - Ta[1:])
        qas[1:] = qwall[:nlm1] * arearat[:nlm1]
        qan[:nlm1] = -qwall[:nlm1] / arearat[:nlm1]
        qa = qas + qan

        # solar reflection and absorption:
        # same for partial day steps:
        sw = np.ones(n.shape) * swtop[
            int(np.mod(np.floor(t * 365), 365))
        ]
        # absorbed on way down:
        swdair = absair * sw
        # longwave cooling of atmosphere:
        lwup = epsua * sigma * Ta ** 4
        lwdown = epsba * sigma * Ta ** 4

        # vertical convection, upward longwave, shortwave done below
        # Suface/ABL fluxes
        # snow effects on albedo and ABL heat capacity:
        ilsnow = np.where(Tsland < Tsnowtotal)
        ilbare = np.where(Tsland > Tsnowstart)
        ilboth = np.where((Tsland <= Tsnowstart) & (Tsland >= Tsnowtotal))
        albland = np.zeros(Tsland.shape)
        Csland = np.zeros(Tsland.shape)
        albland[ilsnow] = albsnow
        Csland[ilsnow] = Css
        albland[ilbare] = albbare
        Csland[ilbare] = Csl
        albland[ilboth] = (
            albbare + (Tsland[ilboth] - Tsnowstart) * (albbare - albsnow) /
            Tsnowrange
        )
        Csland[ilboth] = (
            Csl + (Tsland[ilboth] - Tsnowstart) * (Csl - Css) / Tsnowrange
        )
        # Central Antartica always snowy  :
        albland[nantsnow] = albsnowant
        # Antarctica always snowy:
        Csland[nantsnow] = Css

        # Sea Ice Effects on ABL/ocean Capacity and albedo:
        inoice = np.where(hi == 0)
        iice = np.where(hi > 0)
        # transition region:
        iice1 = np.where((hi > 0) & (hi < zicethick))
        iice2 = np.where(hi >= zicethick)
        hi[inoice] = 0
        # set ice albedo lower if warm (melt ponds):
        iwarm1 = np.where(Tsocean[iice1] > 273)
        iwarm2 = np.where(Tsocean[iice2] > 273)
        albocean = np.zeros(hi.shape)
        albocean[inoice] = albonoice
        # change for different ice thresholds  Kice high to account for leads:
        alboice = np.zeros(hi.shape)
        alboice[iice1] = alboicewin
        alboice[iice1[0][iwarm1]] = alboicesum
        albocean[iice1] = (
            albonoice + hi[iice1] * (alboice[iice1] - albonoice) / zicethick
        )
        # thicker ice has more snow less leads:
        Kice = np.zeros(hi.shape)
        Kice[iice1] = (
            Kicethin + hi[iice1] * (Kicethick - Kicethin) / zicethick
        )
        alboice[iice2] = alboicewin
        alboice[iice2[0][iwarm2]] = alboicesum
        albocean[iice2] = alboice[iice2]
        # low - implicitly includes snow effect:
        Kice[iice2] = Kicethick

        # land areas
        # solar radiation
        # surface incident sw radiation:
        swdsfc = (1 - absair - albatm) * sw
        # surface absorption sw radiation:
        swsland = swdsfc * (1 - albland)
        # reflected back up:
        swbotland = swdsfc * albland
        # longwave up:
        lwsupland = epssfc * sigma * Tsland ** 4

        # vertical advection (convection):
        Valand = Kva * (Tsland - Ta - Va1)
        iv1 = np.where(Valand < 0)
        Valand[iv1] = 0

        # Ocean area
        # flux through ice to top:
        qice = np.zeros(n.shape)
        # sea ice present:
        if iice[0].size > 0:
            qice[iice] = Kice[iice] * (Tfreezebot - Tsocean[iice]) / (hi[iice])
            ithin = np.where(np.abs(qice) > 100)
            qice[ithin] = np.sign(qice[ithin]) * 100
            hi[ithin] = Kice[ithin] * (Tfreezebot - Tsocean[ithin]) / 100
        qlead = (Tfreezebot - Tsocean[iice]) * 10 * leadfraction
        qice[iice] = qice[iice] + qlead

        # latitudinal horizontal ocean advection fluxes:
        qwall[:nlm1] = Khon * (Tocean[:nlm1] - Tocean[1:])
        qos[iblock[0] + 1] = 0
        qos[inoblock[0] + 1] = qwall[inoblock] * ocarearat[inoblock]
        qon[inoblock] = 0
        qon[inoblock] = -qwall[inoblock] / ocarearat[inoblock]
        qao = qos + qon

        # latitudinal horizontal ice advection fluxes:
        qwall[:nlm1] = Khicen * (hi[:nlm1] - hi[1:])
        qis[iblock[0] + 1] = 0
        qis[inoblock[0] + 1] = qwall[inoblock] * ocarearat[inoblock]
        qin[inoblock] = 0
        qin[inoblock] = -qwall[inoblock] / ocarearat[inoblock]
        qaice = qis + qin
        # convert to heat flux:
        qai = -qaice * lvrho
        # solar radiation
        # surface absorption sw radiation:
        swsocean = swdsfc * (1 - albocean)
        # reflected back up:
        swbotocean = swdsfc * albocean

        # longwave up:
        lwsupocean = epssfc * sigma * Tsocean ** 4

        # vertical advection (convection)
        # Fluxes start when lapse rate is > 6C/km:
        Vaocean = Kva * (Tsocean - Ta - Va1)
        iv1 = np.where(Vaocean < 0)
        Vaocean[iv1] = 0

        # Combine total Suface/ABL fluxes
        # zonal average reflected back up:
        swbot = swbotland * (1 - ocarea) + swbotocean * ocarea
        # zonal average absorbed at surface:
        sws = swsland * (1 - ocarea) + swsocean * ocarea
        # zonal average longwave emitted at surface:
        lwsup = lwsupland * (1 - ocarea) + lwsupocean * ocarea
        # zonal average shortwave absorbed on way up:
        swuair = absair * swbot
        # zonal average convective transport (implicitly includes water vapor):
        Va = Valand * (1 - ocarea) + Vaocean * ocarea

        # Temperature changes
        # Upper Air Temperature change:
        Ta = Ta + dtsec * (
            swdair + swuair - lwup - lwdown + epsa * lwsup + qa + Va
        ) / Ca
        # Surface/ABL Temperature change over land:
        Tsland = Tsland + dtsec * (
            -lwsupland + lwdown + swsland - Valand
        ) / Csland
        # Surface/ABL/Ocean change over ocean areas
        # flux down to  surface:
        qatms = -lwsupocean + lwdown + swsocean - Vaocean
        # No ice:  Air/Surface temp adjusts instantly to ocean
        Tsocean[inoice] = Tocean[inoice]
        Tocean[inoice] = Tocean[inoice] + dtsec * (
            qatms[inoice] + qai[inoice] + qao[inoice] + qocean[inoice]
        ) / Cocean
        # Ice Present: Upper fluxes go into ABL:
        Tsocean[iice] = (
            Tsocean[iice] + dtsec * (qatms[iice] + qice[iice]) / Css
        )
        Tocean[iice] = (
            Tocean[iice] + dtsec *
            (qai[iice] + qao[iice] -qice[iice] + qocean[iice]) / Cocean
        )
        # Top ice melting:
        imelt = np.where(Tsocean[iice] > Tfreezetop)
        # Melt ice with excess ABL heat:
        hi[iice[0][imelt]] = hi[iice][imelt] + (
            Tfreezetop - Tsocean[iice][imelt]
        ) * Css / lvrho
        Tsocean[iice[0][imelt]] = Tfreezetop
        # Bottom ice melting :
        iablate = np.where(Tocean[iice] > Tfreezebot)
        hi[iice[0][iablate]] = hi[iice][iablate] + (
            Tfreezebot - Tocean[iice][iablate]
        ) * Cocean / lvrho
        Tocean[iice[0][iablate]] = Tfreezebot
        # Bottom ice freezing or new ice formation:
        ifreeze = np.where(Tocean < Tfreezebot)
        hi[ifreeze] = hi[ifreeze] + (
            Tfreezebot - Tocean[ifreeze]
        ) * Cocean / lvrho
        Tocean[ifreeze] = Tfreezebot
        # Return negative ice thickness to heat ocean:
        ineg = np.where(hi < 0)
        Tocean[ineg] = Tocean[ineg] - hi[ineg] * lvrho / Cocean
        hi[ineg] = 0
        # no sea ice in central Antarctica:
        hi[0] = 0

        # increment step iteration counter:
        iit += 1
        # store data if this is a 'savestep':
        if iit % savestep == 0:
            # days:
            tt[it] = t * 365
            TT[it] = Ta
            TTsland[it] = Tsland
            TTocean[it] = Tocean
            TTsocean[it] = Tsocean
            # Average surface temperature:
            TTsavg[it] = Tsland * (1 - ocarea) + Tsocean * ocarea
            Qs[it] = sws
            Qa[it] = qa
            Qatm[it] = qatms
            Qice[it] = qice
            Qall[it] = qai + qao - qice + qocean
            Qmelt[it] = qatms + qice
            Albocean[it] = albocean
            Lw[it] = lwdown
            Alpha[it] = albland
            Hi[it] = hi
            # increment savestep iteration counter:
            it += 1

    # -- end main model loop

    # convert temperatures to centigrade:
    TT -= 273.16
    TTsland -= 273.16
    TTocean -= 273.16
    TTsocean -= 273.16
    TTsavg -= 273.16

    # create dict for storing result:
    result = {
        'swtop': swtop.T,
        'doy': list(range(1, 366)),
        'l': l,
        'tt': tt,
        'TT': TT.T,
        'TTsland': TTsland.T,
        'TTocean': TTocean.T,
        'TTsocean': TTsocean.T,
        'TTsavg': TTsavg.T,
        'Qs': Qs.T,
        'Qa': Qa.T,
        'Qatm': Qatm.T,
        'Qice': Qice.T,
        'Qall': Qall.T,
        'Qmelt': Qmelt.T,
        'Albocean': Albocean.T,
        'Lw': Lw.T,
        'Alpha': Alpha.T,
        'Hi': Hi.T
    }
    # return the result:
    return result

# ---
