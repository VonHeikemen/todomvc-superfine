/* eslint-disable no-restricted-globals */

import { patch } from 'superfine';
import { store } from './store';
import * as persist from './store/persist';
import App from './components/App';

import 'todomvc-app-css/index.css';
import './style.css';

const getFilter = () => location.hash.includes('#/')
  ? location.hash.replace('#/', '')
  : 'all';

const app = (container, node) => () => {
  node = patch(node, App({ filter: getFilter() }), container);
};

const render = app(document.getElementById('root'));
const saveState = () => persist.save(store.getState());

store.subscribe(render);
store.subscribe(saveState);

window.addEventListener('hashchange', render); 

render();

