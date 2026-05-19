'use strict';


/** global variables: **/


/* site variables: */
var site_vars = {
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
      'default': 10
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
  'result': null
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
  /* enable spinner: */
  model_spinner_el.style.display = 'none';
  /* enable run button: */
  run_button_el.removeAttribute('disabled');
  run_button_el.style.display = site_vars['run_button_display'];

  /* plot containiner element: */
  let plot_container_el = site_vars['plot_container_el'];
  /* enable the element: */
  plot_container_el.style.display = site_vars['plot_container_el_display'];


  /* contour plot test: */
  var x = site_vars['result']['doy'];
  var y = site_vars['result']['l'];
  var z = site_vars['result']['swtop'];
  var xminortickvals = [
    1, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365
  ];
  var xtickvals = [16, 45, 74, 105, 135, 166, 196, 227, 258, 288, 319, 349];
  var xticks = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  var hovertext = [];
  for (let i = 0; i < z.length; i++) {
    hovertext[i] = [];
    for (let j = 0; j < z[i].length; j++) {
      hovertext[i][j] =
        'Day of year: ' + x[j] + '<br>' +
        'Latitude:' + y[i] + '<br>' +
        'Incoming Solar Radiation (Wm⁻²):' + z[i][j].toFixed(2);
    };
  };
  var contour_plot = {
    'name': 'contour_swtop',
    'type': 'contour',
    'colorscale': 'Jet',
    'x': x,
    'y': y,
    'z': z,
    'hoverinfo': 'text',
    'text': hovertext
  };
  var contour_data = [contour_plot];
  var contour_layout = {
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
  var contour_conf = {
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
  };
  Plotly.newPlot('swtop_plot', contour_data, contour_layout, contour_conf);
  /* */

  /* contour plot test: */
  var y = site_vars['result']['l'];
  var TTsavg = site_vars['result']['TTsavg'];
  var cnit = site_vars['result']['cnit'];
  var xi = [];
  var x = [];
  var z = [];
  for (let i = 0; i < TTsavg.length; i++) {
    z[i] = [];
    for (let j = 0; j < cnit.length; j++) {
      z[i][j] = TTsavg[i][cnit[j]];
      x[j] = Math.round(((j + 1) / cnit.length) * 365);
      if (j == 0) {
        xi[j] = 1;
      } else {
        xi[j] = x[j];
      };
    };
  };
  var xminortickvals = [
    1, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365
  ];
  var xtickvals = [16, 45, 74, 105, 135, 166, 196, 227, 258, 288, 319, 349];
  var xticks = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  var hovertext = [];
  for (let i = 0; i < z.length; i++) {
    hovertext[i] = [];
    for (let j = 0; j < z[i].length; j++) {
      hovertext[i][j] =
        'Day of year: ' + x[j] + '<br>' +
        'Latitude:' + y[i] + '<br>' +
        'Surface Temperature (°C):' + z[i][j].toFixed(2);
    };
  };
  var contour_plot = {
    'name': 'contour_TTsavg',
    'type': 'contour',
    'colorscale': 'Jet',
    'x': xi,
    'y': y,
    'z': z,
    'hoverinfo': 'text',
    'text': hovertext
  };
  var contour_data = [contour_plot];
  var contour_layout = {
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
  var contour_conf = {
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
  };
  Plotly.newPlot('TTsavg_plot', contour_data, contour_layout, contour_conf);
  /* */

}


/** listeners: **/


/* on window load ... : */
window.addEventListener('load', function() {
  /* add options inputs: */
  add_options();
  /* hide some elements ... : */
  hide_elements();
});
