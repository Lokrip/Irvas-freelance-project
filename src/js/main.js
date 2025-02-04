import '../assets/css/style.css'
// import '../assets/css/bootstrap.css'
import '../assets/css/animate.min.css'
import "./slider";

import Modal from "./modules/modals";
import Tabs from './modules/tabs';
import Forms from './modules/forms';

window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    new Modal();
    new Tabs(".glazing_slider",".glazing_block", ".glazing_content", "active");
    new Tabs(".decoration_slider",".no_click", ".decoration_content > div > div", "after_click");
    new Tabs(".balcon_icons",".balcon_icons_img", ".big_img > img", "do_image_more", "inline-block");
    new Forms()
})