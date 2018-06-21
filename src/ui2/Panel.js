import Control from './Control';
import Container from './Container';

var ID = -1;

/**
 * 面板
 * @param {*} options 
 */
function Panel(options) {
    Container.call(this, options);
    this.cls = options.cls || 'Panel';
    this.id = options.id || 'Panel' + ID--;
    this.html = options.html || null;
    this.onClick = options.onClick || null;
};

Panel.prototype = Object.create(Container.prototype);
Panel.prototype.constructor = Panel;

Panel.prototype.render = function () {
    this.dom = document.createElement('div');
    this.dom.className = this.cls;

    if (this.onClick) {
        this.dom.onclick = this.onClick.bind(this);
    }

    if (this.id) {
        this.dom.id = this.id;
    }

    this.parent.appendChild(this.dom);

    var _this = this;

    if (this.html) {
        this.dom.innerHTML = this.html;
    } else {
        this.children.forEach(function (n) {
            if (!(n instanceof Control)) {
                throw 'Panel: n is not an instance of Control.';
            }
            n.parent = _this.dom;
            n.render();
        });
    }
};

export default Panel;