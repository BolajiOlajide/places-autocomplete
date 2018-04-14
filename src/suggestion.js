import React from 'react';


const RenderSuggestion = ({ prediction, onSelectAddress }) => (
  <div 
    className="suggestion" onClick={() => 
    onSelectAddress(prediction.description)}
  >
    <p>{prediction.description}</p>
  </div>
);

export default RenderSuggestion;
