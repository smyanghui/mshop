import App from '@/libs/app';
import Lightbox from '@/components/lightbox';

export default {
    name: 'lightbox',
    bind (element) {
        element.onclick = function (e) {
            const event = e || window.event;
            const target = event.target || event.srcElement;

            event.stopPropagation();
            if (target.nodeName.toLowerCase() === 'img') {
                const imgs = this.querySelectorAll('img');
                const images = Array.from(imgs).map(v => v.src);
                const index = Array.prototype.indexOf.call(imgs, target);

                element.$lightbox = App.factory(Lightbox, {images});
                element.$lightbox.handleCancel = () => {
                    element.$lightbox.visible = false;
                    element.$lightbox.destroy();
                };
                if (index > -1) {
                    element.$lightbox.visible = true;
                    setTimeout(() => {
                        element.$lightbox.goTo(index);
                    });
                }
            }
        };
    }
};