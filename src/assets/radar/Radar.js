// eslint-disable-next-line no-undef

import { BMPGL } from '../../bmpgl.js';

const ak = "rQxHPQX1ua21rWnXzTbUh5KSSUbnefxR";

	export class RadarOverlay extends BMap.Overlay {
	
	  constructor(point, size) {
	    super();
	    this.point = point;
	    this.size = size;
	  }
	
	  initialize(map) {
	    this._map = map;
	    const template = `<div class="radar-box">
	        <div class="radar">
	          <div class="ripple"></div>
	          <div class="ripple"></div>
	          <div class="ripple"></div>
	        </div>
	      </div>`;
	    const divFragment = document.createRange().createContextualFragment(template);
	    const div = divFragment.querySelectorAll('.radar-box')[0];
	    map.getPanes().markerPane.appendChild(div);
	    this._div = div;
	    return div;
	  }
	
	  draw() {
	    // 根据地理坐标转换为像素坐标，并设置给容器
	    const position = this._map.pointToOverlayPixel(this.point);
	    this._div.style.left = `${position.x - this.size / 2}px`;
	    this._div.style.top = `${position.y - this.size / 2}px`;
	  }
	}
	