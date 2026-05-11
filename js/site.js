'use strict';

var arr = null;

async function main() {
  var py_code = null;
  await fetch(
    'fastclimate.py', {'cache': 'no-cache'}
  ).then(async function(data_req) {
    py_code = await data_req.text();
  });
  let pyodide = await loadPyodide();
  await pyodide.loadPackage('numpy');
  await pyodide.runPython(py_code);
  /* */
  let defaults = pyodide.globals.get('DEFAULTS').toJs();
  console.log('***', defaults);
  let data = pyodide.globals.get('DATA').toJs();
  console.log('***', data);
//  let get_arr = pyodide.globals.get('get_arr');
//  arr = get_arr([9.3, 2.7, 1.2]).toJs();
//  console.log('***', arr);
}

window.addEventListener('load', function() {
  main();
});
