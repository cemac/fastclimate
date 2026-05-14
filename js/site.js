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
  /* data gets stored here: */
  'data': {},
  'comparewith': null,
  /* python code to load: */
  'python_path': 'fastclimate.py',
  /* result goes here: */
  'result': null
};


/** functions **/


/* data loading function: */
async function load_data() {
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
  /* */
  main();
};

async function main() {
  let python_path = site_vars['python_path'];
  let python_code = null;
  await fetch(
    python_path, {'cache': 'no-cache'}
  ).then(async function(data_req) {
    python_code = await data_req.text();
  });
  let pyodide = await loadPyodide();
  await pyodide.loadPackage('numpy');
  await pyodide.runPython(python_code);
  /* */
  let defaults = pyodide.globals.get('DEFAULTS').toJs();
  let run_fastclimate = pyodide.globals.get('run_fastclimate');
  let result = run_fastclimate(
    pyodide.toPy(defaults),
    pyodide.toPy(site_vars['data']),
    pyodide.toPy(site_vars['comparewith'])
  );
  console.log('* fastclimate run completed');
  site_vars['result'] = result.toJs();


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
  /* load data: */
  load_data();
});
