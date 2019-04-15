var video_transform = {
    element: 0,
	rotate: 0,
	scale: 1,
    detect_video_element: function(doc){

        if(doc.getElementsByTagName('video').length > 0){
            this.element = doc.getElementsByTagName('video')[0];
            this.create_ranges();

        }else if(doc.getElementsByTagName('iframe').length > 0){
            // в надежде что будет доступ к видео в айфрейме
            // this.detect_video_element(doc.getElementsByTagName('iframe')[0].contentDocument)
        }

    },
    create_ranges: function(){

        this.rotate = 0;
        this.scale = 1;

        var style = document.createElement('style');
        style.className = 'style_video_transform';
        style.type = 'text/css';

        this.element.parentNode.appendChild(style);


        var div = document.createElement('div');
        div.id = "ranges";

        div.innerHTML = "<p class='el_rotate'><input type='range' min='-180' max='180' step='1' value='0' oninput='video_transform.rotate = this.value; video_transform.transform()' onchange='video_transform.rotate = this.value; video_transform.transform()'></p>";
        div.innerHTML += "<p><input type='range' min='0' max='2' step='0.1' value='1' oninput='video_transform.scale = this.value; video_transform.transform()' onchange='video_transform.scale = this.value; video_transform.transform()'></p>";

        this.element.parentNode.parentNode.appendChild(div);
        this.element.classList.add("custom_video_class");
    },
	destroy: function(){
    	this.rotate = 0;
    	this.scale = 1;

        this.transform();

        document.getElementById('ranges').remove();
        document.getElementsByClassName("style_video_transform")[0].remove();

	},
    transform: function(){
        var css = '.custom_video_class { transform: rotate(' + this.rotate*(-1) + 'deg) scale(' + this.scale + ')';
        document.getElementsByClassName('style_video_transform')[0].innerHTML = css;
    }
};



!document.getElementById('ranges') ?
    video_transform.detect_video_element(document)
:
    video_transform.destroy()
;

