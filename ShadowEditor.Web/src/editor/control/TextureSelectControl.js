import Control from '../../ui/Control';
import TextureWindow from '../window/TextureWindow';

/**
 * 纹理选择控件
 * @param {*} options 
 */
function TextureSelectControl(options) {
    Control.call(this, options);

    this.app = options.app;

    this.texture = null;

    this.onChange = options.onChange || null;
}

TextureSelectControl.prototype = Object.create(Control.prototype);
TextureSelectControl.prototype.constructor = TextureSelectControl;

TextureSelectControl.prototype.render = function () {
    this.dom = document.createElement('div');
    this.dom.className = 'Texture';

    this.canvas = document.createElement('canvas');
    this.canvas.width = 32;
    this.canvas.height = 16;
    this.dom.appendChild(this.canvas);

    this.canvas.addEventListener('click', this.onClick.bind(this));

    this.name = document.createElement('input');
    this.name.disabled = true;
    this.dom.appendChild(this.name);

    this.parent.appendChild(this.dom);
};

TextureSelectControl.prototype.updateUI = function () {
    var canvas = this.dom.children[0];
    var name = this.dom.children[1];
    var context = canvas.getContext('2d');

    var texture = this.texture;

    if (texture !== undefined && texture !== null) {
        var image = texture.image;

        if (image !== undefined && image.width > 0) {
            name.value = texture.name;

            var scale = canvas.width / image.width;
            context.drawImage(image, 0, 0, image.width * scale, image.height * scale);
        } else {
            name.value = '无图片';
            context.clearRect(0, 0, canvas.width, canvas.height);
        }

    } else {
        name.value = '';

        if (context !== null) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
};

TextureSelectControl.prototype.getValue = function () {
    return this.texture;
};

TextureSelectControl.prototype.setValue = function (texture) {
    this.texture = texture;
    this.updateUI();
};

TextureSelectControl.prototype.onClick = function () {
    if (this.window === undefined) {
        this.window = new TextureWindow({
            app: this.app,
            onSelect: this.onSelect.bind(this)
        });
        this.window.render();
    }
    this.window.show();
};

TextureSelectControl.prototype.onSelect = function (data) {
    var loader = new THREE.TextureLoader();
    loader.load(data.Url, texture => {
        this.texture = texture;
        this.texture.name = data.Name;
        this.window.hide();
        this.updateUI();
        this.onChange();
    });
};

export default TextureSelectControl;