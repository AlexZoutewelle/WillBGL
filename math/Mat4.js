"use strict"

/*
  Column-major order 4x4 matrix
*/
var Mat4 = function() {
  var self = this;

  /*
  Create an empty matrix
  */
  self.create = function() {
    return new Float32Array(16);
  }

  /*
  Reusable components for calculations
  */

  var Vector3 = new Vec3();
  var rot_axis = Vector3.create();


  /*
  Set a Mat4 to identity matrix
  */
  self.setIdentity = function(M) {
    M[0] = 1;   M[4] = 0;   M[8] = 0;    M[12] = 0;
    M[1] = 0;   M[5] = 1;   M[9] = 0;    M[13] = 0;
    M[2] = 0;   M[6] = 0;   M[10] = 1;   M[14] = 0;
    M[3] = 0;   M[7] = 0;   M[11] = 0;   M[15] = 1;
  }

  /*
  Copy a Mat4's elements to another Mat4
  */
  self.copy = function(M_to, M_from) {

    for(var i = 0; i < 16; i++) {
      M_to[i] = M_from[i];
    }
    return M_to;

  }

  /*
  Multiply 2 Mat4's, so R = A * B
  */
  self.multiply = function(R, A, B) {
    R[0]  = A[0]*B[0] + A[4]*B[1] + A[8]*B[2]   + A[12]*B[3];
    R[1]  = A[1]*B[0] + A[5]*B[1] + A[9]*B[2]   + A[13]*B[3];
    R[2]  = A[2]*B[0] + A[6]*B[1] + A[10]*B[2]  + A[14]*B[3];
    R[3]  = A[3]*B[0] + A[7]*B[1] + A[11]*B[2]  + A[15]*B[3];

    R[4]  = A[0]*B[4] + A[4]*B[5] + A[8]*B[6]   + A[12]*B[7];
    R[5]  = A[1]*B[4] + A[5]*B[5] + A[9]*B[6]   + A[13]*B[7];
    R[6]  = A[2]*B[4] + A[6]*B[5] + A[10]*B[6]  + A[14]*B[7];
    R[7]  = A[3]*B[4] + A[7]*B[5] + A[11]*B[6]  + A[15]*B[7];

    R[8]  = A[0]*B[8] + A[4]*B[9] + A[8]*B[10]  + A[12]*B[11];
    R[9]  = A[1]*B[8] + A[5]*B[9] + A[9]*B[10]  + A[13]*B[11];
    R[10] = A[2]*B[8] + A[6]*B[9] + A[10]*B[10] + A[14]*B[11];
    R[11] = A[3]*B[8] + A[7]*B[9] + A[11]*B[10] + A[15]*B[11];

    R[12] = A[0]*B[12] + A[4]*B[13] + A[8]*B[14]  + A[12]*B[15];
    R[13] = A[1]*B[12] + A[5]*B[13] + A[9]*B[14]  + A[13]*B[15];
    R[14] = A[2]*B[12] + A[6]*B[13] + A[10]*B[14] + A[14]*B[15];
    R[15] = A[3]*B[12] + A[7]*B[13] + A[11]*B[14] + A[15]*B[15];
  }

  /*
  Multiply a series of matrices one after the other.
  */
  self.multiplySeries = function(args) {

  }

  /*
  Multiply a Vector3 with a Mat4
  */
  self.multiplyV3 = function(r, M, v) {
    r[0] = M[0]*v[0] + M[4]*v[1] + M[8] *v[2];
    r[1] = M[1]*v[0] + M[5]*v[1] + M[9] *v[2];
    r[2] = M[2]*v[0] + M[6]*v[1] + M[10]*v[2];
  }

  /*
  Multiply a Point4 with a Mat4
  */
  self.multiplyP4 = function(r, M, p) {
    r[0] = M[0]*p[0] + M[4]*p[1] + M[8] *p[2] + M[12]*p[3];
    r[1] = M[1]*p[0] + M[5]*p[1] + M[9] *p[2] + M[13]*p[3];
    r[2] = M[2]*p[0] + M[6]*p[1] + M[10]*p[2] + M[14]*p[3];
    r[3] = M[3]*p[0] + M[7]*p[1] + M[11]*p[2] + M[15]*p[3];

  }

  /*
  Transpose a Mat4
  */
  self.transpose = function(M) {
    //We use t to swap elements
    var t;

    t = M[1];  M[1]  = M[4];  M[4]  = t;
    t = M[2];  M[2]  = M[8];  M[8]  = t;
    t = M[3];  M[3]  = M[12]; M[12] = t;
    t = M[6];  M[6]  = M[9];  M[9]  = t;
    t = M[7];  M[7]  = M[13]; M[13] = t;
    t = M[11]; M[11] = M[14]; M[14] = t;
  }

  /*
  Log a Mat4 to the console
  */
  self.log = function(M) {
    var mat_text = "";
    var row_text;
    for(var i = 0; i < 16; i++) {
      if(4%i === 0) {
        mat_text += '/n' + row_text;
        row_text += '';
      }
      row_text += M[i] + ' ';
    }

    console.log(mat_text);
  }

  /*
  Get the inverse of a matrix
  */
  self.inverse = function (Inv, M) {

    // Factored out common terms
    var t9_14_13_10 = M[9] * M[14] - M[13] * M[10];
    var t13_6_5_14  = M[13] * M[6] - M[5] * M[14];
    var t5_10_9_6   = M[5] * M[10] - M[9] * M[6];
    var t12_10_8_14 = M[12] * M[10] - M[8] * M[14];
    var t4_14_12_6  = M[4] * M[14] - M[12] * M[6];
    var t8_6_4_10   = M[8] * M[6] - M[4] * M[10];
    var t8_13_12_9  = M[8] * M[13] - M[12] * M[9];
    var t12_5_4_13  = M[12] * M[5] - M[4] * M[13];
    var t4_9_8_5    = M[4] * M[9] - M[8] * M[5];
    var t1_14_13_2  = M[1] * M[14] - M[13] * M[2];
    var t9_2_1_10   = M[9] * M[2] - M[1] * M[10];
    var t12_2_0_14  = M[12] * M[2] - M[0] * M[14];
    var t0_10_8_2   = M[0] * M[10] - M[8] * M[2];
    var t0_13_12_1  = M[0] * M[13] - M[12] * M[1];
    var t8_1_0_9    = M[8] * M[1] - M[0] * M[9];
    var t1_6_5_2    = M[1] * M[6] - M[5] * M[2];
    var t4_2_0_6    = M[4] * M[2] - M[0] * M[6];
    var t0_5_4_1    = M[0] * M[5] - M[4] * M[1];

    Inv[0] = M[7] * t9_14_13_10 + M[11] * t13_6_5_14 + M[15] * t5_10_9_6;
    Inv[4] = M[7] * t12_10_8_14 + M[11] * t4_14_12_6 + M[15] * t8_6_4_10;
    Inv[8] = M[7] * t8_13_12_9 + M[11] * t12_5_4_13 + M[15] * t4_9_8_5;
    Inv[12] = M[6] * -t8_13_12_9 + M[10] * -t12_5_4_13 + M[14] * -t4_9_8_5;
    Inv[1] = M[3] * -t9_14_13_10 + M[11] * t1_14_13_2 + M[15] * t9_2_1_10;
    Inv[5] = M[3] * -t12_10_8_14 + M[11] * t12_2_0_14 + M[15] * t0_10_8_2;
    Inv[9] = M[3] * -t8_13_12_9 + M[11] * t0_13_12_1 + M[15] * t8_1_0_9;
    Inv[13] = M[2] * t8_13_12_9 + M[10] * -t0_13_12_1 + M[14] * -t8_1_0_9;
    Inv[2] = M[3] * -t13_6_5_14 + M[7] * -t1_14_13_2 + M[15] * t1_6_5_2;
    Inv[6] = M[3] * -t4_14_12_6 + M[7] * -t12_2_0_14 + M[15] * t4_2_0_6;
    Inv[10] = M[3] * -t12_5_4_13 + M[7] * -t0_13_12_1 + M[15] * t0_5_4_1;
    Inv[14] = M[2] * t12_5_4_13 + M[6] * t0_13_12_1 + M[14] * -t0_5_4_1;
    Inv[3] = M[3] * -t5_10_9_6 + M[7] * -t9_2_1_10 + M[11] * -t1_6_5_2;
    Inv[7] = M[3] * -t8_6_4_10 + M[7] * -t0_10_8_2 + M[11] * -t4_2_0_6;
    Inv[11] = M[3] * -t4_9_8_5 + M[7] * -t8_1_0_9 + M[11] * -t0_5_4_1;
    Inv[15] = M[2] * t4_9_8_5 + M[6] * t8_1_0_9 + M[10] * t0_5_4_1;

    var det;
    det =
        M[3]  * (M[6] * -t8_13_12_9 + M[10] * -t12_5_4_13 + M[14] * -t4_9_8_5) +
        M[7]  * (M[2] * t8_13_12_9  + M[10] * -t0_13_12_1 + M[14] * -t8_1_0_9) +
        M[11] * (M[2] * t12_5_4_13  + M[6] * t0_13_12_1   + M[14] * -t0_5_4_1) +
        M[15] * (M[2] * t4_9_8_5    + M[6] * t8_1_0_9     + M[10] * t0_5_4_1);

    if (det !== 0) {
      var j;
      var scale = 1 / det;
      for (j = 0; j < 16; j += 1) {
        Inv[j] = Inv[j] * scale;
      }
    }
  }


  /*
  Create parameters for a perspective projection matrix
  These parameters will be used to create a matrix representing the fustrum by calling self.createFustrum
  */
  self.setPerspectiveMatrix = function(fovy, aspectRatio, near, far) {

    var fovy_h = DegToRad(fovy) / 2;
    var top = near * Math.tan(fovy_h);
    var bot = -top;
    var right = top * aspectRatio;
    var left = -right;

    return self.createFustrum(left, right, bot, top, near, far);
  }

  /*
  Create the perspective projection matrix
  */
  self.createFustrum = function(left, right, bot, top, near, far) {
    var M = self.create();
    //scaling the window to a unit cube
    var sx = 2 * (right - left);
    var sy = 2 / (top - bottom);
    //mapping z coordinates to the unit cube
    var c1 = 2 * near * far / (near - far );
    var c2 = (far + near) / (far - near);
    //Move Fustrum Apex to origin
    var tx = -near * (left + right) / (right - left);
    var ty = -near * (bottom + top) / (top - bottom);


    M[0] = sx;   M[4] = 0;    M[8] = 0;     M[12] = tx;
    M[1] = 0;    M[5] = sy;   M[9] = 0;     M[13] = ty;
    M[2] = 0;    M[6] = 0;    M[10] = c2;   M[14] = c1;
    M[3] = 0;    M[7] = 0;    M[11] = -1;   M[15] = 0;

    return M;
  }


  /*
  Setting up a matrix for scaling
  */
  self.scale = function(M, sx, sy, sz) {
    M[0] = sx;   M[4] = 0;    M[8] = 0;     M[12] = 0;
    M[1] = 0;    M[5] = sy;   M[9] = 0;     M[13] = 0;
    M[2] = 0;    M[6] = 0;    M[10] = sz;   M[14] = 0;
    M[3] = 0;    M[7] = 0;    M[11] = 0;    M[15] = 1;
  }

  /*
  Setting up a matrix for translation
  */
  self.translate = function(M, tx, ty, tz) {
    M[0] = 1;   M[4] = 0;   M[8] = 0;    M[12] = tx;
    M[1] = 0;   M[5] = 1;   M[9] = 0;    M[13] = ty;
    M[2] = 0;   M[6] = 0;   M[10] = 1;   M[14] = tz;
    M[3] = 0;   M[7] = 0;   M[11] = 0;   M[15] = 1;
  }

  /*
  Setting up a matrix for rotation around the x-axis
  */
  self.rotateX = function(M, angle) {
    angle = DegToRad(angle);
    var c = Math.cos(angle);
    var s = Math.sin(angle);

    M[0] = 1;   M[4] = 0;   M[8] = 0;    M[12] = 0;
    M[1] = 0;   M[5] = c;   M[9] = -s;   M[13] = 0;
    M[2] = 0;   M[6] = s;   M[10] = c;   M[14] = 0;
    M[3] = 0;   M[7] = 0;   M[11] = 0;   M[15] = 1;
  }

  /*
  Setting up a matrix for rotation around the y-axis
  */
  self.rotateY = function(M, angle) {
    angle = DegToRad(angle);
    var c = Math.cos(angle);
    var s = Math.sin(angle);

    M[0] = c;   M[4] = 0;   M[8] = s;   M[12] = 0;
    M[1] = 0;   M[5] = 1;   M[9] = 0;   M[13] = 0;
    M[2] = -s;  M[6] = 0;   M[10] = c;  M[14] = 0;
    M[3] = 0;   M[7] = 0;   M[11] = 0;  M[15] = 1;
  }

  /*
  Setting up a matrix for rotation around the z-axis
  */
  self.rotateZ = function(M, angle) {
    angle = DegToRad(angle);
    var c = Math.cos(angle);
    var s = Math.sin(angle);

    M[0] = c;   M[4] = -s;  M[8] = 0;   M[12] = 0;
    M[1] = s;   M[5] = c;   M[9] = 0;   M[13] = 0;
    M[2] = 0;   M[6] = 0;   M[10] = 1;  M[14] = 0;
    M[3] = 0;   M[7] = 0;   M[11] = 0;  M[15] = 1;
  }

  /*
  Rotate around an arbitrary axis
  */
  self.rotate = function(M, angle, x, y, z) {
    angle = DegToRad(angle);
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var c1 = 1 - c;

    rot_axis[0] = x;
    rot_axis[1] = y;
    rot_axis[2] = z;
    Vector3.normalize(rot_axis);

    M[0] = c + rot_axis[0] * rot_axis[0] * c1;                M[4] = rot_axis[0] * rot_axis[1] * c1 - rot_axis[2] * s;   M[8] = rot_axis[0] * rot_axis[2] * c1 + rot_axis[1] * s;     M[12] = 0;
    M[1] = rot_axis[1] * rot_axis[0] * c1 + rot_axis[2] * s;  M[5] = c + rot_axis[1] * rot_axis[1] * c1;                 M[9] = rot_axis[1] * rot_axis[2] * c1 - rot_axis[0] * s;     M[13] = 0;
    M[2] = rot_axis[2] * rot_axis[0] * c1 - rot_axis[1] * s;  M[6] = rot_axis[2] * rot_axis[1] * c1 + rot_axis[0] * s;   M[10] = c + rot_axis[2] * rot_axis[2] * c1;                  M[14] = 0;
    M[3] = 0;                                                 M[7] = 0;                                                  M[11] = 0;                                                   M[15] = 1;
  }

  /*
  The LookAt function for setting up a camera
  */
  self.lookAt = function() {

  }
}
