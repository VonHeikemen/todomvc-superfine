/* eslint-disable no-restricted-globals */

import { patch } from 'superfine';
import { store } from './store';
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

store.subscribe(render);

window.addEventListener('hashchange', render); 

render();

