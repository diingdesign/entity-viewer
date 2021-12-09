import React, { useState } from 'react';
import { isURL, getUSDZ, getGithubRawURL, getParameterByName } from './Utils';
import Form from './Form';
import EntityViewer from './EntityViewer';
//import logo from './logo.svg';
import './App.css';

function App() {
  var para = getParameterByName("model");
  if (para !== null) {
    para = getGithubRawURL(para);
  }
  var paraIsRealityFile = getParameterByName("isRealityFile");
  if (paraIsRealityFile !== null) {
    paraIsRealityFile = (paraIsRealityFile === "true");
  }
  const [model, setModel] = useState(`${para}`);
  const [submittedModel, setSubmittedModel] = useState(`${para}`);
  const [usdz, setUsdz] = React.useState(`${(para === null) ? "null" : getUSDZ(para, paraIsRealityFile)}`);
  const [submittedUsdz, setSubmittedUsdz] = useState(`${(para === null) ? "null" : getUSDZ(para, paraIsRealityFile)}`);
  const [isRealityFile, setIsRealityFile] = useState(paraIsRealityFile);
  const [enableUsdzField, setEnableUsdzField] = useState(false);
  //console.log(`url: ${getParameterByName("model")}`);

  const handleIsRealityFileChange = (event) => {
    setIsRealityFile(event.target.checked);
  }

  const handleUsdzCheckboxChange = (evt) => {
    setEnableUsdzField(evt.target.checked);
  }
  
  const handleChange = (evt) => {
    setModel(`${evt.target.value}`);
  }
  
  const handleUsdzFieldChange = (evt) => {
    setUsdz(`${evt.target.value}`);
  }
  
  const handleSubmit = (evt) => {
    // handle submit
    const m = getGithubRawURL(model);
    setSubmittedModel(m);
    if (enableUsdzField && isURL(usdz)) {
      // use specified usdz location
      setSubmittedUsdz(`${getUSDZ(getGithubRawURL(usdz), isRealityFile)}`);
    } else {
      setSubmittedUsdz(`${getUSDZ(m, isRealityFile)}`);
    }
    window.location.href = `${window.location.origin}${window.location.pathname}?model=${m}&isRealityFile=${isRealityFile}`;
    evt.preventDefault();
  }

  return (
    <div className="App container mt-2">
      <Form onChange={handleChange} url={model} onSubmit={handleSubmit} onUsdzCheckboxChange={handleUsdzCheckboxChange} enableUsdzField={enableUsdzField} onUsdzFieldChange={handleUsdzFieldChange} isRealityFile={isRealityFile} onRealityCheckboxChange={handleIsRealityFileChange} />
      <EntityViewer url={submittedModel} usdz={submittedUsdz} />
    </div>
  );
}

export default App;
