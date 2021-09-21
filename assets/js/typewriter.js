

// const colorList = [
//         {color: "red"},
//         {color: "#EB8258"},
//         {color: "#145C9E"},
//         {color: "#70D6FF"},
//         {color: "#0B6E4F"},
//         {color: "#66999B"},
// ]


var TxtType = function(el,fullText,period){
  this.fullText = fullText;
  this.el = el;
  this.loopNum = 0
  this.period = parseInt(period,10) || 2000;
  this.txt = '' ;
  this.tick();
  this.isDeleting = false;
}



TxtType.prototype.tick = function() {

  var fullTxt = this.fullText
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  //write it out inside span 
  this.el.innerHTML = '<span class="input-cursor">'+this.txt+'</span>';
  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  //if reaches the end of a text
  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  }
  //if done deleting the text
  else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);



};



window.onload = function() {
  var elements = document.getElementsByClassName('typewriter');

  for (var i = 0;i<elements.length;i++){
    var fullTxt = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');

    if (fullTxt){
      new TxtType(elements[i],fullTxt,period);
    }
  }


};


