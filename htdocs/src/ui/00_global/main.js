require('slick-carousel');
require("slick-carousel/slick/slick.css");
require("slick-carousel/slick/slick-theme.css");

(function (w, d, undefined) {

    "use strict";

    var init = function () {
            video.init();
            header.init();
            dropdown.init();
            draggslider.init();
            teamslider.init();
            accordeon.init();
            scrollTo.init();
            tableswitch.init();
            creditplan.init();
            fullscreenVisual.init();
            inputs.init();
            validation.init();
            selectDropdown.init();
            flare.init();
            headerBrand.init();

        },

        loaded = function () {

            colorMode.setColorMode();
            headerBrand.shouldIAnimate();
            header.shouldIStickOrShouldIGo();

        };

    d.addEventListener('DOMContentLoaded', init);
    w.addEventListener('load', loaded);

}(window, window.document));


window.onYouTubeIframeAPIReady = function () {
    video.loadPlayer();
}


import {validation} from '../00_libs/validation.js';
import {scrollTo} from '../00_libs/scrollTo.js';
import {accordeon} from '../00_libs/accordeon.js';
import {dropdown} from '../00_libs/dropdown.js';
import {colorMode} from '../00_libs/colorMode.js';
import { detectBrowser } from "../00_libs/detect-browser";

import {selectDropdown} from '../02_atoms/selectDropdown/selectDropdown.js';
import {inputs} from '../02_atoms/forms/inputs.js';
import {flare} from '../02_atoms/flare/flare.js';

import {video} from '../03_molecules/video/video.js';
import {tableswitch} from '../03_molecules/credittable/tableswitch.js';
import {teamslider} from '../03_molecules/teamslider/teamslider.js';
import {draggslider} from '../03_molecules/draggslider/draggslider.js';
import {newsgallery} from '../03_molecules/newsgallery/newsgallery.js';

import {fullscreenVisual} from '../04_organisms/fullscreenVisual/fullscreenVisual.js';
import {creditplan} from '../04_organisms/creditplan/creditplan.js';
import {header} from '../04_organisms/header/header.js';
import {headerBrand} from '../04_organisms/header/headerBrand.js';






