'use strict';


/** global variables: **/


/* site variables: */
let site_vars = {
  /* path to data files: */
  'data_path': 'data',
  /* data files to load: */
  'data_files': {
    'area10': 'area10.json',
    'swtop': 'swtop.json',
    'tinit_2co2': 'tinit_2co2.json',
    'tinit': 'tinit.json'
  },
  'comparewith_file': '35yearstandard.json',
  /* model options informations: */
  'options_el': document.getElementById('content_options'),
  'options': {
    'toffset': {
      'section': 'Initial conditions',
      'label': 'Initial Temperature offsets',
      'units': '°C or K',
      'min': -100,
      'max': 100,
      'default': 0
    },
    'iceoffset': {
      'section': 'Initial conditions',
      'label': 'Initial ice thickness offsets',
      'units': 'm (metres)',
      'min': -50,
      'max': 50,
      'default': 0
    },
    'co2': {
      'section': 'CO₂ concentration',
      'label': 'Simulated CO2 concentration (1=today)',
      'min': 0.1,
      'max': 10,
      'default': 1.0
    },
    'sc': {
      'section': 'Shortwave (solar) radiation parameters',
      'label': 'Solar "constant"',
      'units': 'J/s/m²',
      'min': 1000,
      'max': 1700,
      'default': 1365
    },
    'albsnow': {
      'section': 'Shortwave (solar) radiation parameters',
      'label': 'albedo of snow-covered land surfaces (except Antarctica)',
      'min': 0,
      'max': 1,
      'default': 0.73
    },
    'albsnowant': {
      'section': 'Shortwave (solar) radiation parameters',
      'label': 'albedo of surface in Antarctica (higher because no trees)',
      'min': 0,
      'max': 1,
      'default': 0.85
    },
    'albbare': {
      'section': 'Shortwave (solar) radiation parameters',
      'label': 'albedo of non-ice land',
      'min': 0,
      'max': 1,
      'default': 0.15
    },
    'albonoice': {
      'section': 'Shortwave (solar) radiation parameters',
      'label': 'albedo of ice-free ocean',
      'min': 0,
      'max': 1,
      'default': 0.08
    },
    'alboicewin': {
      'section': 'Shortwave (solar) radiation parameters',
      'label': 'thick ice winter albedo',
      'min': 0,
      'max': 1,
      'default': 0.75
    },
    'alboicesum': {
      'section': 'Shortwave (solar) radiation parameters',
      'label': 'thick ice summer albedo',
      'min': 0,
      'max': 1,
      'default': 0.65
    },
    'albatm': {
      'section': 'Shortwave (solar) radiation parameters',
      'label': 'atmosphere and cloud albedo',
      'min': 0,
      'max': 1,
      'default': 0.26
    },
    'absair': {
      'section': 'Shortwave (solar) radiation parameters',
      'label': 'atmosphere and cloud shortwave absorption parameter',
      'min': 0,
      'max': 1,
      'default': 0.18
    },
    'epsua1': {
      'section': 'Longwave (IR) radiation parameters',
      'label': 'upwelling atmospheric emissivity',
      'min': 0.1,
      'max': 2,
      'default': 0.9
    },
    'epsba1': {
      'section': 'Longwave (IR) radiation parameters',
      'label': 'downwelling atmospheric emissivity',
      'min': 0.1,
      'max': 2,
      'default': 1.22
    },
    'epsa1': {
      'section': 'Longwave (IR) radiation parameters',
      'label': 'total atmosphere LW absorptivity',
      'min': 0,
      'max': 1,
      'default': 0.945
    },
    'epssfc': {
      'section': 'Longwave (IR) radiation parameters',
      'label': 'Surface/ABL emmissivity',
      'min': 0.1,
      'max': 1,
      'default': 1
    },
    'Kha': {
      'section': 'Advection coefficients',
      'label': 'Horizontal advection parameter for atmosphere',
      'units': 'J lat²/s/m²/K',
      'min': 0,
      'max': 3000,
      'default': 1100,
      'note': '* Decrease <tt>dtday</tt> for <tt>Kha</tt> > <tt>1500</tt>'
    },
    'Kho1': {
      'section': 'Advection coefficients',
      'label': 'Horizontal advection parameter for ocean',
      'units': 'J lat²/s/m²/K',
      'min': 0,
      'max': 2000,
      'default': 300
    },
    'Khicefactor': {
      'section': 'Advection coefficients',
      'label': '<tt>Khicefactor × Kho1</tt> = Horizontal advection parameter for sea ice',
      'units': 'm³K/J',
      'min': 0,
      'max': 2e-7,
      'default': 3.3e-8
    },
    'Va1': {
      'section': 'Advection coefficients',
      'label': 'Minimum <tt>T<sub>surface</sub> − T<sub>500mb</sub></tt> for vertical advection (convection)',
      'units': '°C or K',
      'min': 10,
      'max': 50,
      'default': 26
    },
    'Kva': {
      'section': 'Advection coefficients',
      'label': 'Vertical advection transfer coefficient',
      'units': 'J/s/m²/K',
      'min': 0,
      'max': 100,
      'default': 35
    },
    'Kicethick': {
      'section': 'Sea ice parameters',
      'label': 'Thick sea ice vertical heat transfer coefficient, includes snow',
      'units': 'J/s/m/K',
      'min': 0.02,
      'max': 2.5,
      'default': 0.8
    },
    'Kicethin': {
      'section': 'Sea ice parameters',
      'label': 'Thin sea ice vertical heat transfer coefficient, assumes no snow',
      'units': 'J/s/m/K',
      'min': 0.5,
      'max': 3,
      'default': 2
    },
    'zicethick': {
      'section': 'Sea ice parameters',
      'label': 'no albedo or heat heat transfer coefficient changes at thicker ice',
      'units': 'm',
      'min': 0,
      'max': 3,
      'default': 0.5
    },
    'leadfraction': {
      'section': 'Sea ice parameters',
      'label': 'equivalent open water in pack ice',
      'units': 'fraction',
      'min': 0,
      'max': 1,
      'default': 0.05
    },
    'Csl': {
      'section': 'Surface/ABL heat capacities',
      'label': 'ABL and soil heat capacity',
      'units': 'J/m²/K',
      'min': 2e4,
      'max': 1e8,
      'default': 4e6,
      'note': '* Decrease <tt>dtday</tt> for <tt>Csl</tt> < <tt>2e6</tt>'
    },
    'Css': {
      'section': 'Surface/ABL heat capacities',
      'label': 'ABL heat capacity alone (or with snow surface)',
      'units': 'J/m²/K',
      'min': 2e4,
      'max': 1e8,
      'default': 2e6,
      'note': '* Decrease <tt>dtday</tt> for <tt>Css</tt> < <tt>2e6</tt>'
    },
    'Tsnowtotal': {
      'section': 'Snow parameters',
      'label': 'Temperature below which surface assumed totally covered with snow',
      'units': 'K',
      'min': 250,
      'max': 274,
      'default': 269
    },
    'Tsnowstart': {
      'section': 'Snow parameters',
      'label': 'Temperature above which surface assumed totally snow-free',
      'units': 'K',
      'min': 272,
      'max': 290,
      'default': 278
    },
    'hocean': {
      'section': 'Ocean parameters',
      'label': 'Ocean mixed layer depth',
      'units': 'metres',
      'min': 5,
      'max': 5000,
      'default': 50
    },
    'qocean1': {
      'section': 'Ocean parameters',
      'label': 'Ocean flux from below mixed layer (not conserved)',
      'units': 'J/s/m²',
      'min': -100,
      'max': 500,
      'default': 2
    },
    'tmax': {
      'section': 'Model parameters',
      'label': 'Length of model run',
      'units': 'years',
      'min': 2,
      'max': 35,
      'default': 15
    },
    'plotyears': {
      'section': 'Plotting parameters',
      'label': 'Number of years to plot (the last <tt>plotyears</tt> years are plotted)',
      'units': 'years',
      'min': 1,
      'max': 35,
      'default': 2
    }
  },
  /* model running elements: */
  'run_button_el': document.getElementById('content_run_button'),
  'run_button_display': null,
  'model_spinner_el': document.getElementById('content_model_spinner'),
  /* plot container element: */
  'plot_container_el': document.getElementById('content_plots'),
  'plot_container_el_display': null,
  /* plots and plot elements: */
  'plots': {
    'swtop': {'el': 'swtop_plot', 'fig': 1},
    'TTsavg': {'el': 'TTsavg_plot', 'fig': 2},
    'TTsavg_diff': {'el': 'TTsavg_diff_plot', 'fig': 3},
    'Hi': {'el': 'Hi_plot', 'fig': 4},
    'Hi_diff': {'el': 'Hi_diff_plot', 'fig': 5},
    'TTsavgsp': {'el': 'TTsavgsp_plot', 'fig': 6},
    'TTsavgnp': {'el': 'TTsavgnp_plot', 'fig': 7},
    'TTsavg65s': {'el': 'TTsavg65s_plot', 'fig': 8},
    'TTsavg65n': {'el': 'TTsavg65n_plot', 'fig': 9},
    'TTsavg5n': {'el': 'TTsavg5n_plot', 'fig': 10},
    'His': {'el': 'His_plot', 'fig': 11},
    'Hin': {'el': 'Hin_plot', 'fig': 12},
    'TTsavgmean': {'el': 'TTsavgmean_plot', 'fig': 13},
    'TTsavglat': {'el': 'TTsavglat_plot', 'fig': 14},
    'TTsavgb': {'el': 'TTsavgb_plot', 'fig': 15},
    'TTsavgb_diff': {'el': 'TTsavgb_diff_plot', 'fig': 16},
    'Hib': {'el': 'Hib_plot', 'fig': 17},
    'Hib_diff': {'el': 'Hib_diff_plot', 'fig': 18}
  },
  /* model parameters text element: */
  'model_params_el': document.getElementById('model_params_params'),
  /* color scales: */
  'colorscales': {
    'RdBu': [
      [0.0, 'rgb(5, 48, 97)'],
      [0.07, 'rgb(25, 86, 150)'],
      [0.14, 'rgb(47, 121, 181)'],
      [0.21, 'rgb(79, 155, 199)'],
      [0.29, 'rgb(135, 190, 218)'],
      [0.36, 'rgb(182, 215, 232)'],
      [0.43, 'rgb(219, 234, 242)'],
      [0.5, 'rgb(247, 246, 246)'],
      [0.57, 'rgb(251, 227, 212)'],
      [0.64, 'rgb(249, 196, 169)'],
      [0.71, 'rgb(240, 156, 123)'],
      [0.79, 'rgb(219, 107, 85)'],
      [0.86, 'rgb(193, 54, 57)'],
      [0.93, 'rgb(156, 17, 39)'],
      [1.0, 'rgb(103, 0, 31)']
   ]
  },
  'this_color': '#ee3333',
  'standard_color': '#0030a2',
  'diff_color': '#08a045',
  'Hi_colors': [
    '#0030a2', '#1dadc0', '#08a045', '#c733d8'
  ],
  /* plotly plot config: */
  'plot_conf': {
    'showLink': false,
    'linkText': '',
    'displaylogo': false,
    'modeBarButtonsToRemove': [
      'autoScale2d',
      'lasso2d',
      'toggleSpikelines',
      'select2d'
    ],
    'responsive': true
  },
  /* model options values stored here: */
  'model_options': {
     /* non editable options: */
     'dtday': 1,
     'savestep': 10
   },
  /* variable to indicate if options are o.k.: */
  'model_options_ok': true,
  /* data gets stored here: */
  'data': {},
  'comparewith': null,
  /* pyodide object: */
  'pyodide': null,
  /* python code to load: */
  'python_path': 'fastclimate.py',
  /* result goes here: */
  'result': null,
  /* option load elements: */
  'load_button_el': document.getElementById('content_load_input'),
  'load_info_el': document.getElementById('content_load_info'),
  'load_error_el': document.getElementById('content_load_error'),
  /* save plots button element: */
  'save_plots_button_el': document.getElementById(
    'content_save_plots_button'
  ),
  'save_plots_spinner_el': document.getElementById(
    'content_save_plots_spinner'
  ),
  /* plot saving options: */
  'save_plots_options': {
    'format': 'png',
    'width': 1200,
    'height': 750
  },
  /* save options button element: */
  'save_options_button_el': document.getElementById(
    'content_save_options_button'
  )
};


/** functions **/


/* numeric check function: */
function check_numeric(name, value, value_min, value_max, check_int) {
  /* init output data: */
  let check_value = {
    'status': true,
    'message': null,
  };
  /* check empty: */
  if ((value == null) || (value == '')) {
    check_value['status'] = false;
    check_value['message'] = 'Value is empty.';
  };
  /* check numeric: */
  if (isNaN(value) == true) {
    check_value['status'] = false;
    check_value['message'] = 'Value is not numeric.';
  };
  /* check greater than min: */
  if (value < value_min) {
    check_value['status'] = false;
    check_value['message'] = 'Value must not be less than ' +
                             value_min + '.';
  };
  /* check less than max: */
  if (value > value_max) {
    check_value['status'] = false;
    check_value['message'] = 'Value must not be greater than ' +
                             value_max + '.';
  };
  /* check is integer: */
  if (check_int == true) {
    if (Number.isInteger(parseFloat(value)) == false) {
      check_value['status'] = false;
      check_value['message'] = 'Value should be an integer.';
    };
  };
  /* return the output data: */
  return check_value;
}

/* options validation function: */
function validate_options() {
  /* presume all o.k.: */
  site_vars['model_options_ok'] = true;
  /* option elements: */
  let option_els = site_vars['option_els'];
  /* default option border color: */
  let option_border_ok = '#989898';
  /* option border color on error: */
  let option_border_err = '#ee3333';
  /* get option information from site_vars: */
  let options = site_vars['options'];
  /* run button element: */
  let run_button_el = site_vars['run_button_el'];
  /* loop through options: */
  for (let option in options) {
    /* get values for the option: */
    let my_options = options[option];
    let option_value_el = my_options['value_el'];
    let option_value = option_value_el.value;
    let option_error_el = my_options['error_el'];
    let option_default = my_options['default'];
    let option_label = my_options['label'];
    let option_min = my_options['min'];
    let option_max = my_options['max'];
    /* check value: */
    let check_value = check_numeric(option_label, option_value, option_min, option_max);
    /* if o.k., store value: */
    if (check_value['status'] == true) {
      site_vars['model_options'][option] = parseFloat(option_value);
      option_error_el.style.display = 'none';
      option_value_el.style.borderColor = option_border_ok;
    } else {
      /* not o.k.: */
      site_vars['model_options_ok'] = false;
      option_error_el.innerHTML = check_value['message'];
      option_error_el.style.display = 'inline';
      option_value_el.style.borderColor = option_border_err;
    };
  };
  /* if options are o.k., enable button: */
  if (site_vars['model_options_ok'] == true) {
    run_button_el.removeAttribute('disabled');
  } else {
    run_button_el.setAttribute('disabled', true);
  };
};

/* add input listeners: */
function add_listeners() {
  /* get all text input elements: */
  let option_values = document.getElementsByClassName('option_text');
  /* loop through values: */
  for (let i = 0; i < option_values.length; i++) {
    let option_value = option_values[i];
    /* add focus listener to select text: */
    option_value.addEventListener('focus', option_value.select);
    /* add change listener: */
    option_value.addEventListener('input', validate_options);
    option_value.addEventListener('propertychange', validate_options);
  };
  /* add run button listener: */
  let run_button_el = site_vars['run_button_el'];
  /* add click listener: */
  run_button_el.addEventListener('click', load_data);
  /* add load button listener: */
  let load_button_el = site_vars['load_button_el'];
  load_button_el.addEventListener('change', load_options);
  /* add save plots button listener: */
  let save_plots_button_el = site_vars['save_plots_button_el'];
  save_plots_button_el.addEventListener('click', save_plots);
  /* add save options button listener: */
  let save_options_button_el = site_vars['save_options_button_el'];
  save_options_button_el.addEventListener('click', save_options);
};

/* set initial option values: */
function add_options() {
  /* get main options element: */
  let options_el = site_vars['options_el'];
  /* get option information from site_vars: */
  let options = site_vars['options'];
  /* initialise option section value: */
  let options_section = '';
  /* loop through options: */
  for (let option in options) {
    /* get values for the option: */
    let my_options = options[option];
    let option_section = my_options['section'];
    let option_label = my_options['label'];
    let option_units = my_options['units'];
    let option_min = my_options['min'];
    let option_max = my_options['max'];
    let option_default = my_options['default'];
    let option_note = my_options['note'];
    /* create html elements for section header, if required: */
    if (option_section != options_section) {
      let section_header_el = document.createElement('h4');
      section_header_el.classList = 'option_header';
      section_header_el.innerHTML = option_section;
      options_el.appendChild(section_header_el);
      options_section = option_section;
    };
    /* create html elements for option: */
    let option_el = document.createElement('div');
    option_el.id = 'option_' + option;
    option_el.classList = 'content_option row_wrap';
    let option_label_el = document.createElement('label');
    option_label_el.id = 'option_' + option + '_label';
    option_label_el.classList = 'option_label';
    let option_value_el = document.createElement('input');
    option_value_el.id = 'option_' + option + '_value';
    option_value_el.classList = 'option_text option_value';
    option_value_el.type = 'text';
    option_value_el.maxLength = 10;
    option_value_el.name = option;
    let option_error_el = document.createElement('div');
    option_error_el.id = 'option_' + option + '_error';
    option_error_el.classList = 'option_error';
    /* add elements to page: */
    option_el.appendChild(option_label_el);
    option_el.appendChild(option_value_el);
    options_el.appendChild(option_el);
    options_el.appendChild(option_error_el);
    /* add note if required: */
    let option_note_el = null;
    if ((option_note != undefined) && (option_note != null)) {
      option_note_el = document.createElement('label');
      option_note_el.id = 'option_' + option + '_note';
      option_note_el.classList = 'option_note';
      option_note_el.innerHTML = option_note;
      option_el.appendChild(option_note_el);
    };
    /* store elements: */
    site_vars['options'][option]['label_el'] = option_label_el;
    site_vars['options'][option]['value_el'] = option_value_el;
    site_vars['options'][option]['error_el'] = option_error_el;
    site_vars['options'][option]['note_el'] = option_note_el;
    /* set label: */
    let option_label_html = '<tt>' + option + '</tt>: ';
    option_label_html += option_label;
    if ((option_units != null) & (option_units != undefined)) {
      option_label_html += ',&nbsp; <tt>' + option_units + '</tt>';
    };
    option_label_html += ',&nbsp; <tt>' + option_min + '</tt> to <tt>' +
                         option_max + '</tt>';
    option_label_el.innerHTML = option_label_html;
    /* set value: */
    option_value_el.value = option_default;
  };
  /* validate option values: */
  validate_options();
  /* add listeners to various elements: */
  add_listeners();
};

/* element hiding function: */
function hide_elements() {
  /* plot containiner element: */
  let plot_container_el = site_vars['plot_container_el'];
  /* get display value: */
  site_vars['plot_container_el_display'] = plot_container_el.style.display;
  /* hide the element: */
  plot_container_el.style.display = 'none';
};

/* data loading function: */
async function load_data() {
  /* get run button element: */
  let run_button_el = site_vars['run_button_el'];
  site_vars['run_button_display'] = run_button_el.style.display;
  /* get model spinner element: */
  let model_spinner_el = site_vars['model_spinner_el'];
  /* disable run button: */
  run_button_el.setAttribute('disabled', true);
  run_button_el.style.display = 'none';
  /* enable spinner: */
  model_spinner_el.style.display = 'inline';
  /* check if data is already loaded: */
  let data = site_vars['data'];
  if (Object.keys(data).length == 0) {
    /* data not loaded. load it. data variables: */
    let data_path = site_vars['data_path'];
    let data_files = site_vars['data_files'];
    /* loop through data files: */
    for (let key in data_files) {
      /* url for for this data file: */
      let data_file = data_files[key];
      let data_url = data_path + '/' + data_file;
      /* fetch the data: */
      await fetch(data_url, {}).then(
        async function(data_req) {
          /* if successful: */
          if (data_req.status == 200) {
            /* store json data: */
            site_vars['data'][key] = await data_req.json();
          } else {
            /* log error: */
            console.log('* failed to load data file: ' + data_file);
          };
        }
      );
    };
  };
  /* check if comparison data is already loaded: */
  let comparewith = site_vars['comparewith'];
  if (comparewith == null) {
    /* data not loaded. load it: */
    let data_path = site_vars['data_path'];
    let data_file = site_vars['comparewith_file'];
    let data_url = data_path + '/' + data_file;
    /* fetch the data: */
    await fetch(data_url, {}).then(
      async function(data_req) {
        /* if successful: */
        if (data_req.status == 200) {
          /* store json data: */
          site_vars['comparewith'] = await data_req.json();
        } else {
          /* log error: */
          console.log('* failed to load data file: ' + data_file);
        };
      }
    );
  };
  /* log a message: */
  console.log('* loading data completed');
  /* run the model */
  run_model();
};

/* plot swtop: */
function plot_swtop() {
  /* get name of element for plot: */
  let plot_el = site_vars['plots']['swtop']['el'];
  /* get values to plot: */
  let x = site_vars['result']['doy'];
  let y = site_vars['result']['l'];
  let z = site_vars['result']['swtop'];
  /* xaxis tick values: */
  let xminortickvals = [
    1, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365
  ];
  let xtickvals = [16, 45, 74, 105, 135, 166, 196, 227, 258, 288, 319, 349];
  let xticks = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  /* create hover text: */
  let hovertext = [];
  for (let i = 0; i < z.length; i++) {
    hovertext[i] = [];
    for (let j = 0; j < z[i].length; j++) {
      hovertext[i][j] =
        'Day of year: ' + x[j] + '<br>' +
        'Latitude:' + y[i] + '<br>' +
        'Incoming Solar Radiation (Wm⁻²):' + z[i][j].toFixed(2);
    };
  };
  /* contour plot: */
  let contour_plot = {
    'name': 'contour_swtop',
    'type': 'contour',
    'colorscale': 'Jet',
    'x': x,
    'y': y,
    'z': z,
    'hoverinfo': 'text',
    'text': hovertext
  };
  let contour_data = [contour_plot];
  /* contour layout: */
  let contour_layout = {
    'title': {
      'text': 'Incoming Solar Radiation (Wm⁻²)',
      'y': 0.9
    },
    'xaxis': {
      'title': {
        'text': 'Month'
      },
      'minor': {
        'tickmode': 'array',
        'ticks': 'outside',
        'tickvals': xminortickvals,
        'ticklen': 5
      },
      'range': [1, 366],
      'tickvals': xtickvals,
      'ticklen': 0,
      'ticktext': xticks
    },
    'yaxis': {
      'title': {
        'text': 'Latitude'
      }
    }
  };
  /* contour config: */
  let contour_conf = site_vars['plot_conf'];
  /* draw plot: */
  Plotly.react(plot_el, contour_data, contour_layout, contour_conf);
};

/* plot TTsavg: */
function plot_TTsavg() {
  /* get name of element for plot: */
  let plot_el = site_vars['plots']['TTsavg']['el'];
  /* get values to plot: */
  let y = site_vars['result']['l'];
  let TTsavg = site_vars['result']['TTsavg'];
  /* need to extract final year values: */
  let cnit = site_vars['result']['cnit'];
  let xi = [];
  let x = [];
  let z = [];
  for (let i = 0; i < TTsavg.length; i++) {
    z[i] = [];
    for (let j = 0; j < cnit.length; j++) {
      z[i][j] = TTsavg[i][cnit[j]].toFixed(2);
      x[j] = Math.round(((j + 1) / cnit.length) * 365);
      if (j == 0) {
        xi[j] = 1;
      } else {
        xi[j] = x[j];
      };
    };
  };
  /* xaxis tick values: */
  let xminortickvals = [
    1, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365
  ];
  let xtickvals = [16, 45, 74, 105, 135, 166, 196, 227, 258, 288, 319, 349];
  let xticks = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  /* create hover text: */
  let hovertext = [];
  for (let i = 0; i < z.length; i++) {
    hovertext[i] = [];
    for (let j = 0; j < z[i].length; j++) {
      hovertext[i][j] =
        'Day of year: ' + x[j] + '<br>' +
        'Latitude:' + y[i] + '<br>' +
        'Surface Temperature (°C):' + z[i][j];
    };
  };
  /* contour plot: */
  let contour_plot = {
    'name': 'contour_TTsavg',
    'type': 'contour',
    'colorscale': 'Jet',
    'x': xi,
    'y': y,
    'z': z,
    'hoverinfo': 'text',
    'text': hovertext
  };
  let contour_data = [contour_plot];
  /* contour layout: */
  let contour_layout = {
    'title': {
      'text': 'Surface Temperature (°C)',
      'y': 0.9
    },
    'xaxis': {
      'title': {
        'text': 'Month'
      },
      'minor': {
        'tickmode': 'array',
        'ticks': 'outside',
        'tickvals': xminortickvals,
        'ticklen': 5
      },
      'range': [1, 366],
      'tickvals': xtickvals,
      'ticklen': 0,
      'ticktext': xticks
    },
    'yaxis': {
      'title': {
        'text': 'Latitude'
      }
    }
  };
  /* contour config: */
  let contour_conf = site_vars['plot_conf'];
  /* draw the plot: */
  Plotly.react(plot_el, contour_data, contour_layout, contour_conf);
};

/* plot TTsavg difference: */
function plot_TTsavg_diff() {
  /* get name of element for plot: */
  let plot_el = site_vars['plots']['TTsavg_diff']['el'];
  /* get values to plot: */
  let y = site_vars['result']['l'];
  let TTsavg = site_vars['result']['TTsavg'];
  let TTsavg1 = site_vars['comparewith']['TTsavg1'];
  /* need to extract final year values: */
  let cnit = site_vars['result']['cnit'];
  let xi = [];
  let x = [];
  let z = [];
  let z_min_max = -999999;
  for (let i = 0; i < TTsavg.length; i++) {
    z[i] = [];
    for (let j = 0; j < cnit.length; j++) {
      z[i][j] = (TTsavg[i][cnit[j]] - TTsavg1[i][cnit[j]]).toFixed(2);
      z_min_max = Math.max(z_min_max, Math.abs(Math.round(z[i][j])));
      x[j] = Math.round(((j + 1) / cnit.length) * 365);
      if (j == 0) {
        xi[j] = 1;
      } else {
        xi[j] = x[j];
      };
    };
  };
  if (z_min_max == 0) {
    z_min_max += 1;
  };
  /* xaxis tick values: */
  let xminortickvals = [
    1, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365
  ];
  let xtickvals = [16, 45, 74, 105, 135, 166, 196, 227, 258, 288, 319, 349];
  let xticks = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  /* create hover text: */
  let hovertext = [];
  for (let i = 0; i < z.length; i++) {
    hovertext[i] = [];
    for (let j = 0; j < z[i].length; j++) {
      hovertext[i][j] =
        'Day of year: ' + x[j] + '<br>' +
        'Latitude:' + y[i] + '<br>' +
        'Surface Temperature difference (°C):' + z[i][j];
    };
  };
  /* contour plot: */
  let colorscale = site_vars['colorscales']['RdBu'];
  let contour_plot = {
    'name': 'contour_TTsavg_diff',
    'type': 'contour',
    'colorscale': colorscale,
    'x': xi,
    'y': y,
    'z': z,
    'zmin': -z_min_max,
    'zmax': z_min_max,
    'hoverinfo': 'text',
    'text': hovertext
  };
  let contour_data = [contour_plot];
  /* contour layout: */
  let contour_layout = {
    'title': {
      'text': 'Surface Temperature Difference (°C)',
      'y': 0.9
    },
    'xaxis': {
      'title': {
        'text': 'Month'
      },
      'minor': {
        'tickmode': 'array',
        'ticks': 'outside',
        'tickvals': xminortickvals,
        'ticklen': 5
      },
      'range': [1, 366],
      'tickvals': xtickvals,
      'ticklen': 0,
      'ticktext': xticks
    },
    'yaxis': {
      'title': {
        'text': 'Latitude'
      }
    }
  };
  /* contour config: */
  let contour_conf = site_vars['plot_conf'];
  /* draw the plot: */
  Plotly.react(plot_el, contour_data, contour_layout, contour_conf);
};

/* plot Hi: */
function plot_Hi() {
  /* get name of element for plot: */
  let plot_el = site_vars['plots']['Hi']['el'];
  /* get values to plot: */
  let l = site_vars['result']['l'];
  let Hi = site_vars['result']['Hi'];
  /* need to extract final year values: */
  let cnit = site_vars['result']['cnit'];
  let xi = [];
  let x = [];
  let y = [];
  let z = [];
  let yi = [1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 16, 17];
  for (let i = 0; i < yi.length; i++) {
    let ii = yi[i];
    y[i] = l[ii];
    z[i] = [];
    for (let j = 0; j < cnit.length; j++) {
      if ((ii == 6) || (ii == 11)) {
        z[i][j] = null;
      } else {
        z[i][j] = Hi[ii][cnit[j]].toFixed(2);
      };
      x[j] = Math.round(((j + 1) / cnit.length) * 365);
      if (j == 0) {
        xi[j] = 1;
      } else {
        xi[j] = x[j];
      };
    };
  };
  /* xaxis tick values: */
  let xminortickvals = [
    1, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365
  ];
  let xtickvals = [16, 45, 74, 105, 135, 166, 196, 227, 258, 288, 319, 349];
  let xticks = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  /* yaxis tick values: */
  let ytickvals = [-75, -65, -55, -45, -35, 35, 45, 55, 65, 75, 85];
  /* create hover text: */
  let hovertext = [];
  for (let i = 0; i < z.length; i++) {
    hovertext[i] = [];
    for (let j = 0; j < z[i].length; j++) {
      if ((i == 5) || (i == 6)) {
        hovertext[i][j] = null;
      } else {
        hovertext[i][j] =
          'Day of year: ' + x[j] + '<br>' +
          'Latitude:' + y[i] + '<br>' +
          'Ice Thickness (m):' + z[i][j];
      };
    };
  };
  /* contour plot: */
  let contour_plot = {
    'name': 'contour_Hi',
    'type': 'contour',
    'colorscale': 'Jet',
    'x': xi,
    'y': y,
    'z': z,
    'hoverinfo': 'text',
    'text': hovertext
  };
  let contour_text = {
    'name': 'contour_text_Hi',
    'type': 'scatter',
    'mode': 'text',
    'x': [183],
    'y': [0],
    'text': ['Tropics not shown'],
    'textposition': 'middle center',
    'textfont': {
      'size': 18
    },
    'hoverinfo': 'none'
  }
  let contour_data = [contour_plot, contour_text];
  /* contour layout: */
  let contour_layout = {
    'title': {
      'text': 'Ice Thickness (m)',
      'y': 0.9
    },
    'xaxis': {
      'title': {
        'text': 'Month'
      },
      'minor': {
        'tickmode': 'array',
        'ticks': 'outside',
        'tickvals': xminortickvals,
        'ticklen': 5
      },
      'range': [1, 366],
      'tickvals': xtickvals,
      'ticklen': 0,
      'ticktext': xticks
    },
    'yaxis': {
      'title': {
        'text': 'Latitude'
      },
      'tickvals': ytickvals,
      'zeroline': false
    },
    'showlegend': false
  };
  /* contour config: */
  let contour_conf = site_vars['plot_conf'];
  /* draw the plot: */
  Plotly.react(plot_el, contour_data, contour_layout, contour_conf);
};

/* plot Hi difference: */
function plot_Hi_diff() {
  /* get name of element for plot: */
  let plot_el = site_vars['plots']['Hi_diff']['el'];
  /* get values to plot: */
  let l = site_vars['result']['l'];
  let Hi = site_vars['result']['Hi'];
  let Hi1 = site_vars['comparewith']['Hi1'];
  /* need to extract final year values: */
  let cnit = site_vars['result']['cnit'];
  let xi = [];
  let x = [];
  let y = [];
  let z = [];
  let z_min_max = -999999;
  let yi = [1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 16, 17];
  for (let i = 0; i < yi.length; i++) {
    let ii = yi[i];
    y[i] = l[ii];
    z[i] = [];
    for (let j = 0; j < cnit.length; j++) {
      if ((ii == 6) || (ii == 11)) {
        z[i][j] = null;
      } else {
        z[i][j] = (Hi[ii][cnit[j]] - Hi1[ii][cnit[j]] ).toFixed(2);
        z_min_max = Math.max(z_min_max, Math.abs(Math.round(z[i][j])));
      };
      x[j] = Math.round(((j + 1) / cnit.length) * 365);
      if (j == 0) {
        xi[j] = 1;
      } else {
        xi[j] = x[j];
      };
    };
  };
  if (z_min_max == 0) {
    z_min_max += 1;
  };
  /* xaxis tick values: */
  let xminortickvals = [
    1, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365
  ];
  let xtickvals = [16, 45, 74, 105, 135, 166, 196, 227, 258, 288, 319, 349];
  let xticks = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  /* yaxis tick values: */
  let ytickvals = [-75, -65, -55, -45, -35, 35, 45, 55, 65, 75, 85];
  /* create hover text: */
  let hovertext = [];
  for (let i = 0; i < z.length; i++) {
    hovertext[i] = [];
    for (let j = 0; j < z[i].length; j++) {
      if ((i == 5) || (i == 6)) {
        hovertext[i][j] = null;
      } else {
        hovertext[i][j] =
          'Day of year: ' + x[j] + '<br>' +
          'Latitude:' + y[i] + '<br>' +
          'Ice Thickness Difference (m):' + z[i][j];
      };
    };
  };
  /* contour plot: */
  let colorscale = site_vars['colorscales']['RdBu'];
  let contour_plot = {
    'name': 'contour_Hi',
    'type': 'contour',
    'colorscale': colorscale,
    'x': xi,
    'y': y,
    'z': z,
    'zmin': -z_min_max,
    'zmax': z_min_max,
    'hoverinfo': 'text',
    'text': hovertext
  };
  let contour_text = {
    'name': 'contour_text_Hi',
    'type': 'scatter',
    'mode': 'text',
    'x': [183],
    'y': [0],
    'text': ['Tropics not shown'],
    'textposition': 'middle center',
    'textfont': {
      'size': 18
    },
    'hoverinfo': 'none'
  }
  let contour_data = [contour_plot, contour_text];
  /* contour layout: */
  let contour_layout = {
    'title': {
      'text': 'Ice Thickness Differemce (m)',
      'y': 0.9
    },
    'xaxis': {
      'title': {
        'text': 'Month'
      },
      'minor': {
        'tickmode': 'array',
        'ticks': 'outside',
        'tickvals': xminortickvals,
        'ticklen': 5
      },
      'range': [1, 366],
      'tickvals': xtickvals,
      'ticklen': 0,
      'ticktext': xticks
    },
    'yaxis': {
      'title': {
        'text': 'Latitude'
      },
      'tickvals': ytickvals,
      'zeroline': false
    },
    'showlegend': false
  };
  /* contour config: */
  let contour_conf = site_vars['plot_conf'];
  /* draw the plot: */
  Plotly.react(plot_el, contour_data, contour_layout, contour_conf);
};

/* plot TTsavg time series: */
function plot_TTsavg_ts(plot_el, lati, offset, plot_title) {
  /* get values to plot: */
  let TTsavg = site_vars['result']['TTsavg'];
  let nit = site_vars['result']['nit'];
  let ttp = site_vars['result']['ttp'];
  let TTsavg1 = site_vars['comparewith']['TTsavg1'];
  let this_color = site_vars['this_color'];
  let standard_color = site_vars['standard_color'];
  let diff_color = site_vars['diff_color'];
  /* extract values for final 'plotyears', for specific latitude: */
  let x = [];
  let ya = [];
  let yb = [];
  let yc = [];
  let diff_min_max = -999999;
  /* loop through nit values: */
  for (let i = 0; i < nit.length; i++) {
    /* get values for this step: */
    let niti = nit[i];
    x[i] = ttp[i].toFixed(2);
    /* "make colder due to elevation": */
    ya[i] = (TTsavg[lati][niti] + offset).toFixed(2);
    yb[i] = (TTsavg1[lati][niti] + offset).toFixed(2);
    yc[i] = ya[i] - yb[i];
    diff_min_max = Math.max(
      diff_min_max, Math.abs(Math.round(yc[i]))
    );
  };
  diff_min_max += 1;
  /* scatter plot for standard run: */
  let standard_scatter_plot = {
    'name': 'standard run',
    'type': 'scatter',
    'x': x,
    'y': yb,
    'mode': 'lines',
    'line': {
      'color': standard_color
    },
    'xaxis': 'x',
    'yaxis': 'y',
    'hovertemplate': '%{y:.2f} °C<br>%{x} years from now'
  };
  /* scatter plot for this run: */
  let this_scatter_plot = {
    'name': 'this run',
    'type': 'scatter',
    'x': x,
    'y': ya,
    'mode': 'lines',
    'line': {
      'color': this_color
    },
    'xaxis': 'x',
    'yaxis': 'y',
    'hovertemplate': '%{y:.2f} °C<br>%{x} years from now'
  };
  /* scatter plot for difference: */
  let diff_scatter_plot = {
    'name': 'difference',
    'type': 'scatter',
    'x': x,
    'y': yc,
    'mode': 'lines',
    'line': {
      'color': diff_color
    },
    'xaxis': 'x',
    'yaxis': 'y2',
    'hovertemplate': '%{y:.2f} °C<br>%{x} years from now'
  };
  let scatter_data = [
    standard_scatter_plot, this_scatter_plot, diff_scatter_plot
  ];
  /* scatter layout: */
  let scatter_layout = {
    'title': {
      'text': plot_title
    },
    'xaxis': {
      'title': {
        'text': 'Years from now'
      }
    },
    'yaxis': {
      'title': {
        'text': 'Surface Temperature (°C)'
      },
      'zeroline': false,
      'domain': [0.4, 1]
    },
    'yaxis2': {
      'title': {
        'text': 'Difference (°C)'
      },
      'domain': [0, 0.3],
      'range': [-1 * diff_min_max, diff_min_max]
    },
    'grid': {
      'rows': 2,
      'columns': 1,
      'subplots': [['xy'], ['xy2']],
      'roworder': 'top to bottom'
    }
  };
  /* scatter config: */
  let scatter_conf = site_vars['plot_conf'];
  /* draw the plot: */
  Plotly.react(plot_el, scatter_data, scatter_layout, scatter_conf);
};

/* plot Hi time series: */
function plot_Hi_ts(plot_el, lats, labels, plot_title) {
  /* get values to plot: */
  let Hi = site_vars['result']['Hi'];
  let nit = site_vars['result']['nit'];
  let ttp = site_vars['result']['ttp'];
  let Hi1 = site_vars['comparewith']['Hi1'];
  let Hi_colors = site_vars['Hi_colors'];
  /* extract values for final 'plotyears', for specific latitude: */
  let x = [];
  let y = {};
  let y_std = {};
  let y_diff = {};
  let diff_min_max = -999999;
  /* get values each latitude: */
  for (let i = 0; i < lats.length; i++) {
    let lat = lats[i];
    y[lat] = [];
    y_std[lat] = [];
    y_diff[lat] = [];
    /* loop through nit values: */
    for (let j = 0; j < nit.length; j++) {
      /* get values for this step: */
      let nitj = nit[j];
      x[j] = ttp[j].toFixed(2);
      y[lat][j] = (Hi[lat][nitj]).toFixed(2);
      y_std[lat][j] = (Hi1[lat][nitj]).toFixed(2);
      y_diff[lat][j] = y[lat][j] - y_std[lat][j];
      diff_min_max = Math.max(
        diff_min_max, Math.abs(Math.round(y_diff[lat][j]))
      );
    };
  };
  diff_min_max += 1;
  /* init scatter data: */
  let scatter_data = [];
  /* for each latitude: */
  for (let i = 0; i < lats.length; i++) {
    let lat = lats[i];
    /* scatter plot for standard run: */
    let standard_scatter_plot = {
      'name': 'standard run ' + labels[i],
      'type': 'scatter',
      'x': x,
      'y': y_std[lat],
      'mode': 'lines',
      'line': {
        'color': Hi_colors[i],
        'dash': 'dash'
      },
      'xaxis': 'x',
      'yaxis': 'y',
      'hovertemplate': '%{y:.2f}m<br>%{x} years from now'
    };
    /* scatter plot for this run: */
    let this_scatter_plot = {
      'name': 'this run ' + labels[i],
      'type': 'scatter',
      'x': x,
      'y': y[lat],
      'mode': 'lines',
      'line': {
        'color': Hi_colors[i]
      },
      'xaxis': 'x',
      'yaxis': 'y',
      'hovertemplate': '%{y:.2f}m<br>%{x} years from now'
    };
    /* scatter plot for difference: */
    let diff_scatter_plot = {
      'name': 'difference ' + labels[i],
      'type': 'scatter',
      'x': x,
      'y': y_diff[lat],
      'mode': 'lines',
      'line': {
        'color': Hi_colors[i]
      },
      'xaxis': 'x',
      'yaxis': 'y2',
      'hovertemplate': '%{y:.2f} °C<br>%{x} years from now'
    };
    scatter_data.push(standard_scatter_plot);
    scatter_data.push(this_scatter_plot);
    scatter_data.push(diff_scatter_plot);
  };
  /* scatter layout: */
  let scatter_layout = {
    'title': {
      'text': plot_title
    },
    'xaxis': {
      'title': {
        'text': 'Years from now'
      }
    },
    'yaxis': {
      'title': {
        'text': 'Ice Thickness (m)'
      },
      'zeroline': false,
      'domain': [0.4, 1]
    },
    'yaxis2': {
      'title': {
        'text': 'Difference (m)'
      },
      'domain': [0, 0.3],
      'range': [-1 * diff_min_max, diff_min_max]
    },
    'grid': {
      'rows': 2,
      'columns': 1,
      'subplots': [['xy'], ['xy2']],
      'roworder': 'top to bottom'
    }
  };
  /* scatter config: */
  let scatter_conf = site_vars['plot_conf'];
  /* draw the plot: */
  Plotly.react(plot_el, scatter_data, scatter_layout, scatter_conf);
};

/* plot TTsavg means: */
function plot_TTsavgmean(plot_el) {
  /* get values to plot: */
  let TTsavg = site_vars['result']['TTsavg'];
  let TTsavg1 = site_vars['comparewith']['TTsavg1'];
  let cnit = site_vars['result']['cnit'];
  let l = site_vars['result']['l'];
  let this_color = site_vars['this_color'];
  let standard_color = site_vars['standard_color'];
  let diff_color = site_vars['diff_color'];
  /* xaxis tick values: */
  let xtickvals = [
    -85, -75, -65, -55, -45, -35, -25, -15, -5,
      5,  15,  25,  35,  45,  55,  65,  75,  85
  ];
  let xvals = [
    '85°S', '75°S', '65°S', '55°S', '45°S', '35°S', '25°S', '15°S',  '5°S',
     '5°N', '15°N', '25°N', '35°N', '45°N', '55°N', '65°N', '75°N', '85°N'
  ];
  let xticks = [
    '85°S', '', '65°S', '', '45°S', '', '25°S', '',  '5°S',
     '5°N', '', '25°N', '', '45°N', '', '65°N', '', '85°N'
  ];
  /* extract mean for final year, for each latitude: */
  let x = [];
  let y_std = [];
  let y_this = [];
  let y_diff = [];
  let diff_min_max = -999999;
  let hover_std = [];
  let hover_this = [];
  let hover_diff = [];
  for (let i = 0; i < TTsavg.length; i++) {
    x[i] = l[i];
    let my_std = 0;
    let my_this = 0;
    for (let j = 0; j < cnit.length; j++) {
      my_std += TTsavg1[i][cnit[j]];
      my_this += TTsavg[i][cnit[j]];
    };
    if (i == 0) {
      y_std[i] = (my_std / cnit.length).toFixed(2) - 22;
      y_this[i] = (my_this / cnit.length).toFixed(2) - 22;
    } else {
      y_std[i] = (my_std / cnit.length).toFixed(2);
      y_this[i] = (my_this / cnit.length).toFixed(2);
    };
    y_diff[i] = (y_this[i] - y_std[i]).toFixed(2);
    diff_min_max = Math.max(
      diff_min_max, Math.abs(Math.round(y_diff[i]))
    );
    hover_std[i] = y_std[i] + '°C (' + xvals[i] + ')';
    hover_this[i] = y_this[i] + '°C (' + xvals[i] + ')';
    hover_diff[i] = y_diff[i] + '°C (' + xvals[i] + ')';
  };
  diff_min_max += 1;
  /* scatter plot for standard run: */
  let standard_scatter_plot = {
    'name': 'standard run',
    'type': 'scatter',
    'x': x,
    'y': y_std,
    'mode': 'lines',
    'line': {
      'color': standard_color
    },
    'xaxis': 'x',
    'yaxis': 'y',
    'hoverinfo': 'text',
    'text': hover_std
  };
  /* scatter plot for this run: */
  let this_scatter_plot = {
    'name': 'this run',
    'type': 'scatter',
    'x': x,
    'y': y_this,
    'mode': 'lines',
    'line': {
      'color': this_color
    },
    'xaxis': 'x',
    'yaxis': 'y',
    'hoverinfo': 'text',
    'text': hover_this
  };
  /* scatter plot for difference: */
  let diff_scatter_plot = {
    'name': 'difference',
    'type': 'scatter',
    'x': x,
    'y': y_diff,
    'mode': 'lines',
    'line': {
      'color': diff_color
    },
    'xaxis': 'x',
    'yaxis': 'y2',
    'hoverinfo': 'text',
    'text': hover_diff
  };
  let scatter_data = [
    standard_scatter_plot, this_scatter_plot, diff_scatter_plot
  ];
  /* scatter layout: */
  let scatter_layout = {
    'title': {
      'text': 'Entire Year Mean'
    },
    'xaxis': {
      'title': {
        'text': 'Latitude'
      },
      'zeroline': false,
      'tickvals': xtickvals,
      'ticktext': xticks,
      'ticklabelstandoff': 15
    },
    'yaxis': {
      'title': {
        'text': 'Surface Temperature (°C)'
      },
      'zeroline': false,
      'domain': [0.4, 1]
    },
    'yaxis2': {
      'title': {
        'text': 'Difference (°C)'
      },
      'domain': [0, 0.3],
      'range': [-1 * diff_min_max, diff_min_max]
    },
    'grid': {
      'rows': 2,
      'columns': 1,
      'subplots': [['xy'], ['xy2']],
      'roworder': 'top to bottom'
    }
  };
  /* scatter config: */
  let scatter_conf = site_vars['plot_conf'];
  /* draw the plot: */
  Plotly.react(plot_el, scatter_data, scatter_layout, scatter_conf);
};

/* plot TTsavg :t specific latitudes */
function plot_TTsavglat(plot_el) {
  /* get values to plot: */
  let TTsavg = site_vars['result']['TTsavg'];
  let TTsavg1 = site_vars['comparewith']['TTsavg1'];
  let nit = site_vars['result']['nit'];
  let ttp = site_vars['result']['ttp'];
  let l = site_vars['result']['l'];
  let this_color = site_vars['this_color'];
  let standard_color = site_vars['standard_color'];
  let latis = [17, 15, 9, 8, 3, 0];
  let lat_names = ['85°N', '65°N', '5°N', '5°S', '65°S', '85°S'];
  /* extract values for final 'plotyears', for specific latitude: */
  let x = [];
  let y = {};
  let y_std = {};
  /* get values each latitude: */
  for (let i = 0; i < latis.length; i++) {
    let lat = latis[i];
    y[lat] = [];
    y_std[lat] = [];
    /* loop through nit values: */
    for (let j = 0; j < nit.length; j++) {
      /* get values for this step: */
      let nitj = nit[j];
      x[j] = ttp[j].toFixed(2);
      y[lat][j] = (TTsavg[lat][nitj]).toFixed(2);
      y_std[lat][j] = (TTsavg1[lat][nitj]).toFixed(2);
    };
  };
  /* init scatter data: */
  let scatter_data = [];
  /* for each latitude: */
  for (let i = 0; i < latis.length; i++) {
    let lat = latis[i];
    let lat_name = lat_names[i];
    let y_axis = 'y';
    let std_name = 'standard run';
    let this_name = 'this run';
    let show_legend = true;
    if (i > 0) {
      y_axis = 'y' + (i +1);
      show_legend = false;
    };
    /* scatter plot for standard run: */
    let standard_scatter_plot = {
      'name': std_name,
      'type': 'scatter',
      'x': x,
      'y': y_std[lat],
      'mode': 'lines',
      'line': {
        'color': standard_color
      },
      'xaxis': 'x',
      'yaxis': y_axis,
      'legendgroup': 'standard run',
      'legendgrouptitle': {
        'text': null
      },
      'showlegend': show_legend,
      'hovertemplate': '%{y:.2f}°C<br>%{x} years from now<br>' + lat_name
    };
    /* scatter plot for this run: */
    let this_scatter_plot = {
      'name': this_name,
      'type': 'scatter',
      'x': x,
      'y': y[lat],
      'mode': 'lines',
      'line': {
        'color': this_color
      },
      'xaxis': 'x',
      'yaxis': y_axis,
      'legendgroup': 'this run',
      'legendgrouptitle': {
        'text': null
      },
      'showlegend': show_legend,
      'hovertemplate': '%{y:.2f}°C<br>%{x} years from now<br>' + lat_name
    };
    /* text label for this run: */
    let scatter_label = {
      'name': 'scatter_label',
      'type': 'scatter',
      'mode': 'text',
      'x': [parseFloat(x.slice(-1)[0]) + 0.01],
      'y': y[lat].slice(-1),
      'text': lat_names[i],
      'textposition': 'middle right',
      'textfont': {
        'size': 14
      },
      'xaxis': 'x',
      'yaxis': y_axis,
      'showlegend': false,
      'hoverinfo': 'none'
    };
    scatter_data.push(standard_scatter_plot);
    scatter_data.push(this_scatter_plot);
    scatter_data.push(scatter_label);
  };
  /* scatter layout: */
  let scatter_layout = {
    'title': {
      'text': 'Zonal Temperature'
    },
    'xaxis': {
      'title': {
        'text': 'Years from now'
      }
    },
    'yaxis': {
      'range': [-53, 13],
      'tickvals': [-50, 10],
      'showline': true,
      'zeroline': false,
      'domain': [0.85, 0.99]
    },
    'yaxis2': {
      'range': [-53, 13],
      'tickvals': [-50, 10],
      'showline': true,
      'zeroline': false,
      'domain': [0.68, 0.82]
    },
    'yaxis3': {
      'range': [12, 28],
      'tickvals': [15, 25],
      'showline': true,
      'zeroline': false,
      'domain': [0.51, 0.65]
    },
    'yaxis4': {
      'title': {
        'text': 'Temperature (°C)'
      },
      'range': [12, 28],
      'tickvals': [15, 25],
      'showline': true,
      'zeroline': false,
      'domain': [0.34, 0.48]
    },
    'yaxis5': {
      'range': [-53, 13],
      'tickvals': [-50, 10],
      'showline': true,
      'zeroline': false,
      'domain': [0.17, 0.31]
    },
    'yaxis6': {
      'range': [-53, 13],
      'tickvals': [-50, 10],
      'showline': true,
      'zeroline': false,
      'domain': [0, 0.14]
    },
    'grid': {
      'rows': 6,
      'columns': 1,
      'subplots': [
        ['xy'], ['xy2'], ['xy3'], ['xy4'], ['xy5'], ['xy6']
      ],
      'roworder': 'top to bottom'
    }
  };
  /* scatter config: */
  let scatter_conf = site_vars['plot_conf'];
  /* draw the plot: */
  Plotly.react(plot_el, scatter_data, scatter_layout, scatter_conf);
};

/* plot TTsavgb: */
function plot_TTsavgb() {
  /* get name of element for plot: */
  let plot_el = site_vars['plots']['TTsavgb']['el'];
  /* get values to plot: */
  let y = site_vars['result']['l'];
  let TTsavg = site_vars['result']['TTsavg'];
  let nit = site_vars['result']['nit'];
  let ttp = site_vars['result']['ttp'];
  /* need to extract final plotyears values: */
  let x = [];
  let z = [];
  for (let i = 0; i < TTsavg.length; i++) {
    z[i] = [];
    for (let j = 0; j < nit.length; j++) {
      let nitj = nit[j];
      x[j] = ttp[j].toFixed(2);
      z[i][j] = TTsavg[i][nitj].toFixed(2);
    };
  };
  /* create hover text: */
  let hovertext = [];
  for (let i = 0; i < z.length; i++) {
    hovertext[i] = [];
    for (let j = 0; j < z[i].length; j++) {
      hovertext[i][j] =
        'Years from now: ' + x[j] + '<br>' +
        'Latitude:' + y[i] + '<br>' +
        'Surface Temperature (°C):' + z[i][j];
    };
  };
  /* contour plot: */
  let contour_plot = {
    'name': 'contour_TTsavgb',
    'type': 'contour',
    'colorscale': 'Jet',
    'x': x,
    'y': y,
    'z': z,
    'hoverinfo': 'text',
    'text': hovertext
  };
  let contour_data = [contour_plot];
  /* contour layout: */
  let contour_layout = {
    'title': {
      'text': 'Surface Temperature (°C)',
      'y': 0.9
    },
    'xaxis': {
      'title': {
        'text': 'Year from now'
      }
    },
    'yaxis': {
      'title': {
        'text': 'Latitude'
      }
    }
  };
  /* contour config: */
  let contour_conf = site_vars['plot_conf'];
  /* draw the plot: */
  Plotly.react(plot_el, contour_data, contour_layout, contour_conf);
};

/* plot TTsavgb difference: */
function plot_TTsavgb_diff() {
  /* get name of element for plot: */
  let plot_el = site_vars['plots']['TTsavgb_diff']['el'];
  /* get values to plot: */
  let y = site_vars['result']['l'];
  let TTsavg = site_vars['result']['TTsavg'];
  let TTsavg1 = site_vars['comparewith']['TTsavg1'];
  let nit = site_vars['result']['nit'];
  let ttp = site_vars['result']['ttp'];
  let colorscale = site_vars['colorscales']['RdBu'];
  /* need to extract final plotyears values: */
  let x = [];
  let z = [];
  let z_min_max = -999999;
  for (let i = 0; i < TTsavg.length; i++) {
    z[i] = [];
    for (let j = 0; j < nit.length; j++) {
      let nitj = nit[j];
      x[j] = ttp[j].toFixed(2);
      z[i][j] = (
        TTsavg[i][nitj] - TTsavg1[i][nitj]
      ).toFixed(2);
      z_min_max = Math.max(z_min_max, Math.abs(Math.round(z[i][j])));
    };
  };
  if (z_min_max == 0) {
    z_min_max += 1;
  };
  /* create hover text: */
  let hovertext = [];
  for (let i = 0; i < z.length; i++) {
    hovertext[i] = [];
    for (let j = 0; j < z[i].length; j++) {
      hovertext[i][j] =
        'Years from now: ' + x[j] + '<br>' +
        'Latitude:' + y[i] + '<br>' +
        'Surface Temperature Difference (°C):' + z[i][j];
    };
  };
  /* contour plot: */
  let contour_plot = {
    'name': 'contour_TTsavgb',
    'type': 'contour',
    'colorscale': colorscale,
    'x': x,
    'y': y,
    'z': z,
    'zmin': -z_min_max,
    'zmax': z_min_max,
    'hoverinfo': 'text',
    'text': hovertext
  };
  let contour_data = [contour_plot];
  /* contour layout: */
  let contour_layout = {
    'title': {
      'text': 'Surface Temperature Difference (°C)',
      'y': 0.9
    },
    'xaxis': {
      'title': {
        'text': 'Year from now'
      }
    },
    'yaxis': {
      'title': {
        'text': 'Latitude'
      }
    }
  };
  /* contour config: */
  let contour_conf = site_vars['plot_conf'];
  /* draw the plot: */
  Plotly.react(plot_el, contour_data, contour_layout, contour_conf);
};

/* plot Hib: */
function plot_Hib() {
  /* get name of element for plot: */
  let plot_el = site_vars['plots']['Hib']['el'];
  /* get values to plot: */
  let l = site_vars['result']['l'];
  let Hi = site_vars['result']['Hi'];
  let nit = site_vars['result']['nit'];
  let ttp = site_vars['result']['ttp'];
  /* need to extract final plotyears values: */
  let x = [];
  let z = [];
  let y = [];
  let yi = [1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 16, 17];
  for (let i = 0; i < yi.length; i++) {
    let ii = yi[i];
    y[i] = l[ii];
    z[i] = [];
    for (let j = 0; j < nit.length; j++) {
      let nitj = nit[j];
      x[j] = ttp[j].toFixed(2);
      if ((ii == 6) || (ii == 11)) {
        z[i][j] = null;
      } else {
        z[i][j] = Hi[ii][nitj].toFixed(2);
      };
    };
  };
  /* yaxis tick values: */
  let ytickvals = [-75, -65, -55, -45, -35, 35, 45, 55, 65, 75, 85];
  /* create hover text: */
  let hovertext = [];
  for (let i = 0; i < z.length; i++) {
    hovertext[i] = [];
    for (let j = 0; j < z[i].length; j++) {
      if ((i == 5) || (i == 6)) {
        hovertext[i][j] = null;
      } else {
        hovertext[i][j] =
          'Years from now: ' + x[j] + '<br>' +
          'Latitude:' + y[i] + '<br>' +
          'Sea Ice Thickness (m):' + z[i][j];
      };
    };
  };
  /* contour plot: */
  let contour_plot = {
    'name': 'contour_Hib',
    'type': 'contour',
    'colorscale': 'Jet',
    'x': x,
    'y': y,
    'z': z,
    'hoverinfo': 'text',
    'text': hovertext
  };
  let contour_text = {
    'name': 'contour_text_Hi',
    'type': 'scatter',
    'mode': 'text',
    'x': [x[Math.round(x.length / 2)]],
    'y': [0],
    'text': ['Tropics not shown'],
    'textposition': 'middle center',
    'textfont': {
      'size': 18
    },
    'hoverinfo': 'none'
  }
  let contour_data = [contour_plot, contour_text];
  /* contour layout: */
  let contour_layout = {
    'title': {
      'text': 'Sea Ice Thickness (m)',
      'y': 0.9
    },
    'xaxis': {
      'title': {
        'text': 'Year from now'
      }
    },
    'yaxis': {
      'title': {
        'text': 'Latitude'
      },
      'tickvals': ytickvals,
      'zeroline': false
    }
  };
  /* contour config: */
  let contour_conf = site_vars['plot_conf'];
  /* draw the plot: */
  Plotly.react(plot_el, contour_data, contour_layout, contour_conf);
};

/* plot Hib difference: */
function plot_Hib_diff() {
  /* get name of element for plot: */
  let plot_el = site_vars['plots']['Hib_diff']['el'];
  /* get values to plot: */
  let l = site_vars['result']['l'];
  let Hi = site_vars['result']['Hi'];
  let Hi1 = site_vars['comparewith']['Hi1'];
  let nit = site_vars['result']['nit'];
  let ttp = site_vars['result']['ttp'];
  let colorscale = site_vars['colorscales']['RdBu'];
  /* need to extract final plotyears values: */
  let x = [];
  let y = [];
  let yi = [1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 16, 17];
  let z = [];
  let z_min_max = -999999;
  for (let i = 0; i < yi.length; i++) {
    let ii = yi[i];
    y[i] = l[ii];
    z[i] = [];
    for (let j = 0; j < nit.length; j++) {
      let nitj = nit[j];
      x[j] = ttp[j].toFixed(2);
      if ((ii == 6) || (ii == 11)) {
        z[i][j] = null;
      } else {
        z[i][j] = (Hi[ii][nitj] - Hi1[ii][nitj]).toFixed(2);
        z_min_max = Math.max(z_min_max, Math.abs(Math.round(z[i][j])));
      };
    };
  };
  /* yaxis tick values: */
  let ytickvals = [-75, -65, -55, -45, -35, 35, 45, 55, 65, 75, 85];
  if (z_min_max == 0) {
    z_min_max += 1;
  };
  /* create hover text: */
  let hovertext = [];
  for (let i = 0; i < z.length; i++) {
    hovertext[i] = [];
    for (let j = 0; j < z[i].length; j++) {
      if ((i == 5) || (i == 6)) {
        hovertext[i][j] = null;
      } else {
        hovertext[i][j] =
          'Years from now: ' + x[j] + '<br>' +
          'Latitude:' + y[i] + '<br>' +
          'Sea Ice Thickness Difference (m):' + z[i][j];
      };
    };
  };
  /* contour plot: */
  let contour_plot = {
    'name': 'contour_Hib',
    'type': 'contour',
    'colorscale': colorscale,
    'x': x,
    'y': y,
    'z': z,
    'zmin': -z_min_max,
    'zmax': z_min_max,
    'hoverinfo': 'text',
    'text': hovertext
  };
  let contour_text = {
    'name': 'contour_text_Hi',
    'type': 'scatter',
    'mode': 'text',
    'x': [x[Math.round(x.length / 2)]],
    'y': [0],
    'text': ['Tropics not shown'],
    'textposition': 'middle center',
    'textfont': {
      'size': 18
    },
    'hoverinfo': 'none'
  }
  let contour_data = [contour_plot, contour_text];
  /* contour layout: */
  let contour_layout = {
    'title': {
      'text': 'Sea Ice Thickness Difference (m)',
      'y': 0.9
    },
    'xaxis': {
      'title': {
        'text': 'Year from now'
      }
    },
    'yaxis': {
      'title': {
        'text': 'Latitude'
      },
      'tickvals': ytickvals,
      'zeroline': false
    }
  };
  /* contour config: */
  let contour_conf = site_vars['plot_conf'];
  /* draw the plot: */
  Plotly.react(plot_el, contour_data, contour_layout, contour_conf);
};

/* plot creating function: */
function draw_plots() {
  /* swtop: */
  plot_swtop();
  /* TTsavg: */
  plot_TTsavg();
  /* TTsavg difference: */
  plot_TTsavg_diff();
  /* Hi: */
  plot_Hi();
  /* Hi difference: */
  plot_Hi_diff();
  /* TTsavgsp: */
  plot_TTsavg_ts(site_vars['plots']['TTsavgsp']['el'], 0, -22, 'South Pole');
  /* TTsavgnp: */
  plot_TTsavg_ts(site_vars['plots']['TTsavgnp']['el'], 17, 0, 'North Pole');
  /* TTsavg65s: */
  plot_TTsavg_ts(site_vars['plots']['TTsavg65s']['el'], 3, 0, '65°S');
  /* TTsavg65n: */
  plot_TTsavg_ts(site_vars['plots']['TTsavg65n']['el'], 15, 0, '65°N');
  /* TTsavg5n: */
  plot_TTsavg_ts(site_vars['plots']['TTsavg5n']['el'], 9, 0, '5°N');
  /* His: */
  plot_Hi_ts(
    site_vars['plots']['His']['el'],
    [1, 2, 3, 8],
    ['75°S', '65°S', '55°S', '45°S'],
    'Southern Hemisphere'
  );
  /* Hin: */
  plot_Hi_ts(
    site_vars['plots']['Hin']['el'],
    [17, 16, 15, 14],
    ['85°N', '75°N', '65°N', '55°N'],
    'Northern Hemisphere'
  );
  /* TTsavgmean: */
  plot_TTsavgmean(site_vars['plots']['TTsavgmean']['el']);
  /* TTsavglat: */
  plot_TTsavglat(site_vars['plots']['TTsavglat']['el']);
  /* TTsavgb: */
  plot_TTsavgb();
  /* TTsavgb difference: */
  plot_TTsavgb_diff();
  /* Hib: */
  plot_Hib();
  /* Hib difference: */
  plot_Hib_diff();
};

/* function to display text parameters: */
function display_params() {
  /* element for text info: */
  let model_params_el = site_vars['model_params_el'];
  /* model options: */
  let model_options = site_vars['model_options'];
  /* skip these options: */
  let skip_options = ['dtday', 'savestep', 'comparewith'];
  /* init html: */
  let params_html = '';
  /* loop through options: */
  for (let model_option in model_options) {
    /* skip the options which should be skipped: */
    if (skip_options.indexOf(model_option) > -1) {
      continue;
    };
    /* get value for the option: */
    let option_value = model_options[model_option];
    /* html for this option: */
    let option_html =
      '<tt>' + model_option + ' = ' + option_value + '</tt><br>';
    params_html += option_html;
  };
  /* update html: */
  model_params_el.innerHTML = params_html;
};

/* fasctlimate model running function: */
async function run_model() {
  /* get python code: */
  let python_path = site_vars['python_path'];
  let python_code = null;
  await fetch(
    python_path, {'cache': 'no-cache'}
  ).then(async function(data_req) {
    python_code = await data_req.text();
  });
  /* load pyodide and model dependencies, if required: */
  let pyodide = site_vars['pyodide'];
  if (pyodide == null) {
    pyodide = await loadPyodide();
    await pyodide.loadPackage('numpy');
    await pyodide.runPython(python_code);
    site_vars['pyodide'] = pyodide;
  };
  /* get model running function: */
  let run_fastclimate = pyodide.globals.get('run_fastclimate');
  /* get model inputs: */
  let model_options = site_vars['model_options'];
  model_options['comparewith'] = site_vars['comparewith_file'];
  let data = site_vars['data'];
  let comparewith = site_vars['comparewith'];
  /* run the model: */
  let result = run_fastclimate(
    pyodide.toPy(model_options),
    pyodide.toPy(data),
    pyodide.toPy(comparewith)
  );
  /* log a message and store the result: */
  console.log('* fastclimate run completed');
  site_vars['result'] = result.toJs();
  /* get model spinner element: */
  let model_spinner_el = site_vars['model_spinner_el'];
  /* get run button element: */
  let run_button_el = site_vars['run_button_el'];
  /* disable spinner: */
  model_spinner_el.style.display = 'none';
  /* enable run button: */
  run_button_el.removeAttribute('disabled');
  run_button_el.style.display = site_vars['run_button_display'];
  /* plot containiner element: */
  let plot_container_el = site_vars['plot_container_el'];
  /* enable the element: */
  plot_container_el.style.display = site_vars['plot_container_el_display'];
  /* draw the plots: */
  draw_plots();
  /* add paramater text info: */
  display_params();
}

/* options loading funcion: */
function load_options() {
  /* get input elements: */
  let load_input = site_vars['load_button_el'];
  let load_info = site_vars['load_info_el'];
  let load_error = site_vars['load_error_el'];
  /* get model options: */
  let model_options = site_vars['model_options'];
  /* clear info and error elements: */
  load_info.innerHTML = '';
  load_error.innerHTML = '';
  /* get file information: */
  let options_file = load_input.files[0];
  /* if no file, give up: */
  if ((options_file == undefined) || (options_file == null)) {
    return;
  };
  let options_file_name = options_file.name;
  let options_file_type = options_file.type;
  /* check file type: */
  if (options_file_type != 'application/json') {
    load_error.innerHTML = 'incorrect file type: ' + options_file_name;
    return;
  };
  /* create file reader: */
  let file_reader = new FileReader();
  /* file reader onload function: */
  file_reader.onload = function(file_data) {
    /* get file text: */
    let options_text = file_data.target.result;
    /* try to read json data or give up: */
    let options_json = null;
    try {
      options_json = JSON.parse(options_text);
    } catch {
      load_error.innerHTML = 'error reading file: ' + options_file_name;
      return;
    };
    /* loop through model options: */
    for (let model_option in model_options) {
      /* if this option is in loaded file: */
      if ((options_json[model_option] != undefined) &&
          (options_json[model_option] != null)) {
        /* update the option value: */
        let model_option_el = site_vars['options'][model_option]['value_el'];
        model_option_el.value = options_json[model_option];
      };
    };
    /* display info message: */
    load_info.innerHTML = 'parameters loaded from file: ' + options_file_name;
    /* validate option values: */
    validate_options();
  };
  /* file reader onerror function: */
  file_reader.onerror = function(file_data) {
    /* get error: */
    let options_error = file_data.target.error;
    /* display error message: */
    load_error.innerHTML = 'error reading file: ' + options_file_name +
                           options_error;
    /* give up: */
    return;
  };
  /* read the file: */
  file_reader.readAsText(options_file);
};

/* plots saving funcion: */
async function save_plots() {
  /* get spinner element: */
  let save_plots_spinner_el = site_vars['save_plots_spinner_el'];
  /* get save button element: */
  let save_plots_button_el = site_vars['save_plots_button_el'];
  /* disable save button: */
  save_plots_button_el.setAttribute('disabled', true);
  save_plots_button_el.style.display = 'none';
  /* enable spinner: */
  save_plots_spinner_el.style.display = 'inline';
  /* get plots: */
  let plots = site_vars['plots'];
  /* get plot saving options: */
  let save_plots_options = site_vars['save_plots_options'];
  /* create zip writer object: */
  let zip_writer = new zip.ZipWriter(
    new zip.Data64URIWriter('application/zip')
  );
  /* loop through plots: */
  for (let plot in plots) {
    /* info for this plot: */
    let this_plot = plots[plot];
    let this_plot_el = this_plot['el'];
    let this_plot_fig = this_plot['fig'];
    let this_plot_file_name = 'figure' + this_plot_fig +
                              '.' + save_plots_options['format'];
    /* export plot as image: */
    await Plotly.toImage(this_plot_el, save_plots_options).then(
      async function(image_data) {
        /* add image data to zip file: */
        await zip_writer.add(
          this_plot_file_name, new zip.Data64URIReader(image_data)
        );
      }
    );
  };
  /* close zip file and get encoded data uri: */
  let data_uri = await zip_writer.close();
  /* create element for download link and click: */
  let zip_link = document.createElement('a');
  zip_link.setAttribute('href', data_uri);
  zip_link.setAttribute('download', 'fastclimate_plots.zip');
  zip_link.style.visibility = 'hidden';
  document.body.appendChild(zip_link);
  zip_link.click();
  document.body.removeChild(zip_link);
  /* disable spinner: */
  save_plots_spinner_el.style.display = 'none';
  /* enable run button: */
  save_plots_button_el.removeAttribute('disabled');
  save_plots_button_el.style.display = site_vars['run_button_display'];
};

/* options saving funcion: */
function save_options() {
  /* get model options: */
  let model_options = site_vars['model_options'];
  /* remove these options: */
  delete model_options['dtday'];
  delete model_options['savestep'];
  delete model_options['comparewith'];
  /* jsonify: */
  let model_options_json = JSON.stringify(model_options);
  /* file name for output: */
  let json_name = 'fastclimate_options.json';
  /* create json data: */
  let json_data = 'data:text/json;charset=utf-8,';
  json_data += model_options_json;
  /* encode json data: */
  let encoded_uri = encodeURI(json_data);
  /* create a temporary link element: */
  let json_link = document.createElement('a');
  json_link.setAttribute('href', json_data);
  json_link.setAttribute('download', json_name);
  json_link.style.visibility = 'hidden';
  document.body.appendChild(json_link);
  json_link.click();
  document.body.removeChild(json_link);
};


/** listeners: **/


/* on window load ... : */
window.addEventListener('load', function() {
  /* configure zip.js: */
  zip.configure({
    useWebWorkers: true,
    maxWorkers: 2,
  });
  /* add options inputs: */
  add_options();
  /* hide some elements ... : */
  hide_elements();
});
