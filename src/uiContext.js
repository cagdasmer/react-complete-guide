import React from 'react';

const uiContext = React.createContext({cancelOrder: () => {}, giveOrder: () => {}});

export default uiContext;