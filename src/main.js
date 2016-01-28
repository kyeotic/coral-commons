import React from 'react';
import { render } from 'react-dom';
import Root from 'root/root';
import configureStore from 'store/index';


const appRoot = document.getElementById('app-host');
render(<Root store={configureStore({
    state: {}
})} />, appRoot);