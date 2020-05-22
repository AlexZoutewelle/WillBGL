"use strict";

var Point4 = function() {
  var self = this;

  /*
  Create a new Point4
  */
  self.create = function(x,y,z,w) {
    var p = new Float32Array(4);
    p[0] = x;
    p[1] = y;
    p[2] = z;
    p[3] = w;

    return p;
  }

  /*
  Create a Point4 from an array
  */
  self.fromArray = function(array) {
    var p = new Float32Array(4);
    p[0] = array[0];
    p[1] = array[1];
    p[2] = array[2];
    p[3] = array[3];

    return p;
  }

  /*
  Copy a Point4 to another Point4
  */
  self.copy = function(p_to,p_from){
    p_to[0] = p_from[0];
    p_to[1] = p_from[1];
    p_to[2] = p_from[2];
    p_to[3] = p_from[3];
  }

  /*
  Compute distance between 2 Point4s
  */
  self.getDistance = function(p0,p1){
    return Math.sqrt( (p1[0] - p0[0])**2  + (p1[1] - p0[1])**2 + (p1[2] - p0[2])**2 );
  }

  /*
  Normalization by dividing the point components by the w component
  */
  self.normalize = function(p) {
    p[0] /= p[3];
    p[1] /= p[3];
    p[2] /= p[3];
    p[3] = 1;
  }

  /*
  Log a Point4 to the console
  */
  self.log = function(p) {
    console.log(p[0] + ' ' + p[1] + ' ' + p[2] + ' ' + p[3]);
  }
}
