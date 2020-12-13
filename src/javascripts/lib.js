import $ from "jquery";
window.$ = window.jQuery = $;
window.jQuery.migrateMute = true;

import PubSub from 'pubsub-js';
window.PubSub = PubSub;

import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';

window._ = require('lodash');
window.Instafeed = require("instafeed.js");
