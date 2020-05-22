"use strict";

var vector3 = function() {
  var self = this;

  /*
    Standard function to create a vector
  */
  self.create = function(x,y,z) {
    var v = new Float32Array(3);
    v[0] = x;
    v[1] = y;
    v[2] = z;
    return v;
  }

  /*
  Create a vector from an existing array
  */
  self.fromArray = function(array) {
    var v = new Float32Array(3);
    v[0] = array[0];
    v[1] = array[1];
    v[2] = array[2];
    return v;
  }

  /*
  Copy a vector2 to a vector1
  */
  self.copy = function(vec3_to, vec3_from) {
    vec3_to[0] = vec3_from[0];
    vec3_to[1] = vec3_from[1];
    vec3_to[2] = vec3_from[2];
    return vec3_to;
  }

  /*
  Return the length of a vector3
  */
  self.length = function(v) {
    return Math.sqrt( (v[0] * v[0]) + (v[1] * v[1]) + (v[2] * v[2]) );
  }

  /*
  Turn a vector into a unit vector
  */
  self.normalize = function(v) {
    var length = self.length(v);
    v[0] /= length;
    v[1] /= length;
    v[2] /= length;
  }

  /*
  Add the components of 2 vector3s to a new vector
  */
  self.addVectors = function(result, v0, v1) {
    result[0] = v0[0] + v1[0];
    result[1] = v0[1] + v1[1];
    result[2] = v0[2] + v2[2];
  }

  /*
  Add a scalar to the components of vector3, creating a new vector
  */
  self.addScalar = function(result, v0, scalar) {
    result[0] = v0[0] + scalar;
    result[1] = v0[1] + scalar;
    result[2] = v0[2] + scalar;
  }

  /*
  Subtract the components of 2 vector3s to a new vector
  */
  self.subtractVectors = function(result, v0, v1) {
    result[0] = v0[0] - v1[0];
    result[1] = v0[1] - v1[1];
    result[2] = v0[2] - v2[2];
  }

  /*
  Subtract a scalar to the components of vector3, creating a new vector
  */
  self.subtractScalar = function(result, v0, scalar) {
    result[0] = v0[0] - scalar;
    result[1] = v0[1] - scalar;
    result[2] = v0[2] - scalar;
  }

  /*
  Divide the components of 2 vector3s to a new vector
  */
  self.divideVectors = function(result, v0, v1) {
    result[0] = v0[0] / v1[0];
    result[1] = v0[1] / v1[1];
    result[2] = v0[2] / v2[2];
  }

  /*
  Divide a scalar to the components of vector3, creating a new vector
  */
  self.divideScalar = function(result, v0, scalar) {
    result[0] = v0[0] / scalar;
    result[1] = v0[1] / scalar;
    result[2] = v0[2] / scalar;
  }

  /*
  Multiply the components of 2 vector3s to a new vector
  */
  self.multiplyVectors = function(result, v0, v1) {
    result[0] = v0[0] * v1[0];
    result[1] = v0[1] * v1[1];
    result[2] = v0[2] * v2[2];
  }

  /*
  Multiply a scalar to the components of vector3, creating a new vector
  */
  self.multiplyScalar = function(result, v0, scalar) {
    result[0] = v0[0] * scalar;
    result[1] = v0[1] * scalar;
    result[2] = v0[2] * scalar;
  }


  /*
  Compute the dot product between 2 vector3s
  */
  self.dotProduct = function(v0, v1) {
    return v0[0] * v1[0] + v0[1] * v1[1] + v0[2] * v0[2];
  }


  /*
  Compute the cross product between 2 vector3s
  */
  self.crossProduct = function(result, v0, v1) {
    result[0] = v0[1] * v1[2] - v0[2] * v1[1];
    result[1] = v0[2] * v1[0] - v0[0] * v1[2];
    result[2] = v0[0] * v1[1] - v0[1] * v1[0];
  }

  /*
  Log a Vector3
  */
  self.log = function(v) {
    console.log(v[0] + ' ' + v[1] + ' ' + v[2]);
  }
}
