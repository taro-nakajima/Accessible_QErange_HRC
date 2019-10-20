//JavaScript code for calculating accessible Q-E ranges for HRC
// programed by T. Nakajima (ISSP-NSL) Oct. 20, 2019.

var Ei = new Array(5);
var decimal_digit = 1000;


function draw() {

//    draw_RLattice();

    draw_TOF();

    draw_Qxy()
}

function draw_TOF(){

    var marginX = 50;
    var marginY = 20;

    var Ltotal = 190;
    var Lsc = 140;
    var L1 = 150;
    var TOF_len = 400;
    var TextSize = 10;
    var ChopperOpen = 4;

    var Ei_numMax=5;

    var TickL = 8;

    var TOF_at_Chopper = new Array(50);

    //get elements from the document
    var canvas2 = document.getElementById('CanvasTOF');
    var context2 = canvas2.getContext('2d');

    var temp = document.getElementById('freq');
    var ChopPeriod = 1.0/Number(temp.value)*1000.0*10/2;
    var ChopRept = TOF_len/ChopPeriod;

    var temp = document.getElementById('offset');
    var ChopOfst = Number(temp.value)*10;

    var temp = document.getElementById('Ei_Num_ofst');
    var Ei_num_ofst = Number(temp.value);


    //refresh
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    context2.strokeStyle = "rgb(0, 0, 0)";
    context2.lineWidth=1;


    //text labels
    context2.font = "italic 10px sans-serif";
    context2.fillText("Chopper", 1, marginY+Ltotal-Lsc+TextSize/2);
    context2.fillText("Sample", 1, marginY+Ltotal-L1+TextSize/2);
    context2.fillText("Source", 1, marginY+Ltotal+TextSize/2);
    context2.fillText("Detector", 1, marginY+TextSize/2);


    // x axis
    context2.beginPath();
    context2.moveTo(marginX, Ltotal+marginY);
    context2.lineTo(marginX, marginY);
    context2.stroke();

    // x ticks
    context2.font = " 10px sans-serif";
    for (var i=0;i<5;i+=1){
        context2.beginPath();
        context2.moveTo(marginX+TOF_len/4*i, marginY+Ltotal);
        context2.lineTo(marginX+TOF_len/4*i, marginY+Ltotal-TickL);
        context2.stroke();
        context2.fillText(i*10, marginX+TOF_len/4*i-TextSize/2, marginY+Ltotal+TextSize*1.5);
    }

    // x label
    context2.fillText("Time (ms)", marginX+TOF_len/2-TextSize, marginY+Ltotal+TextSize*3);

    // y axis
    context2.beginPath();
    context2.moveTo(marginX, Ltotal+marginY);
    context2.lineTo(marginX+TOF_len, Ltotal+marginY);
    context2.stroke();

    // sample position
    context2.strokeStyle = "rgb(180, 180, 180)";
    context2.beginPath();
    context2.moveTo(marginX, Ltotal+marginY-L1);
    context2.lineTo(marginX+TOF_len, Ltotal+marginY-L1);
    context2.stroke();

    // det position
    context2.strokeStyle = "rgb(180, 180, 180)";
    context2.beginPath();
    context2.moveTo(marginX, marginY);
    context2.lineTo(marginX+TOF_len, marginY);
    context2.stroke();


    //chopper
    context2.lineWidth=4;
    context2.strokeStyle = "rgb(100, 100, 100)";
    context2.beginPath();
    context2.moveTo(marginX, Ltotal+marginY-Lsc);
    context2.lineTo(marginX+ChopPeriod-ChopperOpen/2-ChopOfst, Ltotal+marginY-Lsc);
    context2.stroke();
    TOF_at_Chopper[0]=(ChopPeriod-ChopOfst)/10.0;

    for (var i = 1; i < ChopRept; i += 1) {
        context2.beginPath();
        context2.moveTo(marginX+ChopPeriod*i+ChopperOpen/2-ChopOfst, Ltotal+marginY-Lsc);
        context2.lineTo(marginX+ChopPeriod*(i+1)-ChopperOpen/2-ChopOfst, Ltotal+marginY-Lsc);
        context2.stroke();
        TOF_at_Chopper[i]=(ChopPeriod*(i+1)-ChopOfst)/10.0;
    }

    document.getElementById('E1').value = Math.round((22.86/TOF_at_Chopper[Ei_num_ofst]*1.4)**2.0*decimal_digit)/decimal_digit ;
    Ei[0]=(22.86/TOF_at_Chopper[Ei_num_ofst]*1.4)**2.0 ;
    document.getElementById('E2').value = Math.round((22.86/TOF_at_Chopper[Ei_num_ofst+1]*1.4)**2.0*decimal_digit)/decimal_digit ;
    Ei[1]=(22.86/TOF_at_Chopper[Ei_num_ofst+1]*1.4)**2.0 ;
    document.getElementById('E3').value = Math.round((22.86/TOF_at_Chopper[Ei_num_ofst+2]*1.4)**2.0*decimal_digit)/decimal_digit ;
    Ei[2]=(22.86/TOF_at_Chopper[Ei_num_ofst+2]*1.4)**2.0 ;
    document.getElementById('E4').value = Math.round((22.86/TOF_at_Chopper[Ei_num_ofst+3]*1.4)**2.0*decimal_digit)/decimal_digit ;
    Ei[3]=(22.86/TOF_at_Chopper[Ei_num_ofst+3]*1.4)**2.0 ;
    document.getElementById('E5').value = Math.round((22.86/TOF_at_Chopper[Ei_num_ofst+4]*1.4)**2.0*decimal_digit)/decimal_digit ;
    Ei[4]=(22.86/TOF_at_Chopper[Ei_num_ofst+4]*1.4)**2.0 ;

    context2.lineWidth=1;
    for (var i = 0; i < Ei_numMax; i += 1) {
        context2.strokeStyle = "rgb(255, 0, 0)";
        context2.beginPath();
        context2.moveTo(marginX, marginY+Ltotal);
//        context2.lineTo(marginX+TOF_at_Chopper[Ei_num_ofst+i]*10.0*Ltotal/Lsc, marginY);
        context2.lineTo(marginX+TOF_at_Chopper[Ei_num_ofst+i]*10.0*Ltotal/Lsc, marginY);
        context2.stroke();
    }

}


function draw_Qxy(){

    var canvas3 = new Array(5);
    var context3 = new Array(5);

    canvas3[0] = document.getElementById('CanvasQxy1');
    context3[0] = canvas3[0].getContext('2d');
    canvas3[1] = document.getElementById('CanvasQxy2');
    context3[1] = canvas3[1].getContext('2d');
    canvas3[2] = document.getElementById('CanvasQxy3');
    context3[2] = canvas3[2].getContext('2d');
    canvas3[3] = document.getElementById('CanvasQxy4');
    context3[3] = canvas3[3].getContext('2d');
    canvas3[4] = document.getElementById('CanvasQxy5');
    context3[4] = canvas3[4].getContext('2d');

    var omg1 = Number(document.getElementById('omega1').value);
    var omg2 = Number(document.getElementById('omega2').value);

    var a_star = Number(document.getElementById('a_star').value);
    var b_star = Number(document.getElementById('b_star').value);
    var gamma = Number(document.getElementById('gamma').value);

    var frac_hbw = new Array(5);
    frac_hbw[0] = Number(document.getElementById('frac_hbw1').value);
    frac_hbw[1] = Number(document.getElementById('frac_hbw2').value);
    frac_hbw[2] = Number(document.getElementById('frac_hbw3').value);
    frac_hbw[3] = Number(document.getElementById('frac_hbw4').value);
    frac_hbw[4] = Number(document.getElementById('frac_hbw5').value);

    var qh = new Array(3);
    var qk = new Array(3);
    qh[0] = Number(document.getElementById('qh1').value);
    qk[0] = Number(document.getElementById('qk1').value);
    qh[1] = Number(document.getElementById('qh2').value);
    qk[1] = Number(document.getElementById('qk2').value);
    qh[2] = Number(document.getElementById('qh3').value);
    qk[2] = Number(document.getElementById('qk3').value);


    var tth_Max = new Array(4);
    var tth_Min = new Array(4);
    tth_Max[0] = Number(document.getElementById('D1_tth_max').value);
    tth_Min[0] = Number(document.getElementById('D1_tth_min').value);
    tth_Max[1] = Number(document.getElementById('D2_tth_max').value);
    tth_Min[1] = Number(document.getElementById('D2_tth_min').value);
    tth_Max[2] = Number(document.getElementById('D3_tth_max').value);
    tth_Min[2] = Number(document.getElementById('D3_tth_min').value);
    tth_Max[3] = Number(document.getElementById('D4_tth_max').value);
    tth_Min[3] = Number(document.getElementById('D4_tth_min').value);


    var radius = 3; // radius for each reciprocal lattice point

    var originX = canvas3[0].width/2.0;
    var originY = canvas3[0].height/2.0;

    var DetBankNum = 4;

    var scale0 = 1.5;

    var scale = new Array(5);
    var ki = new Array(5);

    for (var j=0;j<5;j+=1){
        ki[j]=Math.sqrt(Ei[j]/2.072);
        scale[j] = canvas3[0].width/2.0/(2.0*ki[j])*scale0;
    }

    document.getElementById('hbw1').value = Math.round(Ei[0]*frac_hbw[0]*decimal_digit)/decimal_digit;
    document.getElementById('E1_calc').innerHTML = Math.round(Ei[0]*decimal_digit)/decimal_digit;
    document.getElementById('hbw2').value = Math.round(Ei[1]*frac_hbw[1]*decimal_digit)/decimal_digit;
    document.getElementById('E2_calc').innerHTML = Math.round(Ei[1]*decimal_digit)/decimal_digit;
    document.getElementById('hbw3').value = Math.round(Ei[2]*frac_hbw[2]*decimal_digit)/decimal_digit;
    document.getElementById('E3_calc').innerHTML = Math.round(Ei[2]*decimal_digit)/decimal_digit;
    document.getElementById('hbw4').value = Math.round(Ei[3]*frac_hbw[3]*decimal_digit)/decimal_digit;
    document.getElementById('E4_calc').innerHTML = Math.round(Ei[3]*decimal_digit)/decimal_digit;
    document.getElementById('hbw5').value = Math.round(Ei[4]*frac_hbw[4]*decimal_digit)/decimal_digit;
    document.getElementById('E5_calc').innerHTML = Math.round(Ei[4]*decimal_digit)/decimal_digit;


    //accessible area
    var cosOmg1 = Math.cos(Math.PI/180.0*omg1);
    var sinOmg1 = Math.sin(Math.PI/180.0*omg1);

    var cosOmg2 = Math.cos(Math.PI/180.0*omg2);
    var sinOmg2 = Math.sin(Math.PI/180.0*omg2);


    for(var p=0;p<5;p+=1){


    //refresh
    context3[p].clearRect(0, 0, canvas3[p].width, canvas3[p].height);
    context3[p].strokeStyle = "rgb(0, 0, 0)";
    context3[p].lineWidth=1;

    var kf = Math.sqrt(Ei[p]*(1.0-frac_hbw[p])/2.072);


    for(i_tth=0;i_tth<DetBankNum;i_tth+=1){

        context3[p].beginPath();
        context3[p].lineWidth=1;

        var dX=(Math.cos(Math.PI/180.0*tth_Min[i_tth])*kf-1.0*ki[p])*scale[p];
        var dY=(Math.sin(Math.PI/180.0*tth_Min[i_tth]))*kf*scale[p];

        var tempX = cosOmg1*dX - sinOmg1*dY;
        var tempY = sinOmg1*dX + cosOmg1*dY;

        var dX = tempX;
        var dY = tempY;


        context3[p].moveTo(originX+dX, originY-dY);
        for (var tth= tth_Min[i_tth]; tth <= tth_Max[i_tth]; tth += 0.5) {
            var dX=(Math.cos(Math.PI/180.0*tth)*kf-1.0*ki[p])*scale[p];
            var dY=(Math.sin(Math.PI/180.0*tth))*kf*scale[p];

            var tempX = cosOmg1*dX - sinOmg1*dY;
            var tempY = sinOmg1*dX + cosOmg1*dY;

            var dX = tempX;
            var dY = tempY;

            context3[p].lineTo(originX+dX , originY - dY);
        }
        for (var omg= omg1; omg < omg2; omg += 0.5) {
            var dX=(Math.cos(Math.PI/180.0*tth_Max[i_tth])*kf-1.0*ki[p])*scale[p];
            var dY=(Math.sin(Math.PI/180.0*tth_Max[i_tth]))*kf*scale[p];

            var tempX = Math.cos(Math.PI/180.0*omg)*dX - Math.sin(Math.PI/180.0*omg)*dY;
            var tempY = Math.sin(Math.PI/180.0*omg)*dX + Math.cos(Math.PI/180.0*omg)*dY;

            var dX = tempX;
            var dY = tempY;

            context3[p].lineTo(originX+dX , originY - dY);
        }
        for (var i= tth_Max[i_tth]; i >= tth_Min[i_tth]; i -= 0.5) {
            var dX=(Math.cos(Math.PI/180.0*i)*kf-1.0*ki[p])*scale[p];
            var dY=(Math.sin(Math.PI/180.0*i))*kf*scale[p];

            var tempX = cosOmg2*dX - sinOmg2*dY;
            var tempY = sinOmg2*dX + cosOmg2*dY;

            var dX = tempX;
            var dY = tempY;
            context3[p].lineTo(originX+dX , originY - dY);
        }
        for (var omg= omg2; omg > omg1; omg -= 0.5) {
            var dX=(Math.cos(Math.PI/180.0*tth_Min[i_tth])*kf-1.0*ki[p])*scale[p];
            var dY=(Math.sin(Math.PI/180.0*tth_Min[i_tth]))*kf*scale[p];

            var tempX = Math.cos(Math.PI/180.0*omg)*dX - Math.sin(Math.PI/180.0*omg)*dY;
            var tempY = Math.sin(Math.PI/180.0*omg)*dX + Math.cos(Math.PI/180.0*omg)*dY;

            var dX = tempX;
            var dY = tempY;

            context3[p].lineTo(originX+dX , originY - dY);
        }
        context3[p].fillStyle="rgb(220, 230, 250)";
        context3[p].fill();
        context3[p].strokeStyle="rgb(0, 0, 250)";
        context3[p].stroke();

    }

    //R-lattice
    var cosGamma = Math.cos(Math.PI/180.0*gamma);
    var sinGamma = Math.sin(Math.PI/180.0*gamma);

    var Hmax = parseInt(2.0*ki[p]/a_star*2);
    var Kmax = parseInt(2.0*ki[p]/b_star*2);

    //q-vector 1
    context3[p].fillStyle="rgb(50, 220, 50)";
    for (var h=-Hmax;h<=Hmax;h+=1){
        for (var k=-Kmax;k<=Kmax;k+=1){
            //hkl+q
            var PosX = originX-((h+qh[0])*a_star+(k+qk[0])*b_star*cosGamma)*scale[p];
            var PosY = originY-(-(k+qk[0])*b_star*sinGamma)*scale[p];
            if ((Math.abs(PosX-originX)<canvas3[p].width/2.0)&&(Math.abs(PosY-originY)<canvas3[p].height/2.0)){
                context3[p].beginPath();
                context3[p].arc(PosX,PosY, radius, 0, 2 * Math.PI);
                context3[p].fill();
            }
            //hkl-q
            PosX = originX-((h-qh[0])*a_star+(k-qk[0])*b_star*cosGamma)*scale[p];
            PosY = originY-(-(k-qk[0])*b_star*sinGamma)*scale[p];
            if ((Math.abs(PosX-originX)<canvas3[p].width/2.0)&&(Math.abs(PosY-originY)<canvas3[p].height/2.0)){
                context3[p].beginPath();
                context3[p].arc(PosX,PosY, radius, 0, 2 * Math.PI);
                context3[p].fill();
            }
        }
    }

    //q-vector 2
    context3[p].fillStyle="rgb(50, 150, 250)";
    for (var h=-Hmax;h<=Hmax;h+=1){
        for (var k=-Kmax;k<=Kmax;k+=1){
            //hkl+q
            var PosX = originX-((h+qh[1])*a_star+(k+qk[1])*b_star*cosGamma)*scale[p];
            var PosY = originY-(-(k+qk[1])*b_star*sinGamma)*scale[p];
            if ((Math.abs(PosX-originX)<canvas3[p].width/2.0)&&(Math.abs(PosY-originY)<canvas3[p].height/2.0)){
                context3[p].beginPath();
                context3[p].arc(PosX,PosY, radius, 0, 2 * Math.PI);
                context3[p].fill();
            }
            //hkl-q
            PosX = originX-((h-qh[1])*a_star+(k-qk[1])*b_star*cosGamma)*scale[p];
            PosY = originY-(-(k-qk[1])*b_star*sinGamma)*scale[p];
            if ((Math.abs(PosX-originX)<canvas3[p].width/2.0)&&(Math.abs(PosY-originY)<canvas3[p].height/2.0)){
                context3[p].beginPath();
                context3[p].arc(PosX,PosY, radius, 0, 2 * Math.PI);
                context3[p].fill();
            }
        }
    }

    //q-vector 3
    context3[p].fillStyle="rgb(250, 150, 100)";
    for (var h=-Hmax;h<=Hmax;h+=1){
        for (var k=-Kmax;k<=Kmax;k+=1){
            //hkl+q
            var PosX = originX-((h+qh[2])*a_star+(k+qk[2])*b_star*cosGamma)*scale[p];
            var PosY = originY-(-(k+qk[2])*b_star*sinGamma)*scale[p];
            if ((Math.abs(PosX-originX)<canvas3[p].width/2.0)&&(Math.abs(PosY-originY)<canvas3[p].height/2.0)){
                context3[p].beginPath();
                context3[p].arc(PosX,PosY, radius, 0, 2 * Math.PI);
                context3[p].fill();
            }
            //hkl-q
            PosX = originX-((h-qh[2])*a_star+(k-qk[2])*b_star*cosGamma)*scale[p];
            PosY = originY-(-(k-qk[2])*b_star*sinGamma)*scale[p];
            if ((Math.abs(PosX-originX)<canvas3[p].width/2.0)&&(Math.abs(PosY-originY)<canvas3[p].height/2.0)){
                context3[p].beginPath();
                context3[p].arc(PosX,PosY, radius, 0, 2 * Math.PI);
                context3[p].fill();
            }

        }
    }

    //R-lattice
    context3[p].fillStyle="rgb(150, 150, 150)";

    for (var h=-Hmax;h<=Hmax;h+=1){
        for (var k=-Kmax;k<=Kmax;k+=1){
            var PosX = originX-(h*a_star+k*b_star*cosGamma)*scale[p];
            var PosY = originY-(-k*b_star*sinGamma)*scale[p];
            if ((Math.abs(PosX-originX)<canvas3[p].width/2.0)&&(Math.abs(PosY-originY)<canvas3[p].height/2.0)){
                context3[p].beginPath();
                context3[p].arc(PosX,PosY, radius, 0, 2 * Math.PI);
                context3[p].fill();
            }
        }
    }

    // draw a star
    context3[p].beginPath();
    context3[p].strokeStyle="rgb(250, 100, 100)";
    context3[p].lineWidth=2;
    context3[p].moveTo(originX,originY);
    context3[p].lineTo(originX-a_star*scale[p] , originY);
    context3[p].stroke();

    var arrow_head = 12;
    var font_size = 14;
    context3[p].beginPath();
    context3[p].lineWidth=1;
    context3[p].fillStyle="rgb(250, 100, 100)";
    //context3[p].moveTo(originX-a_star*scale[p] , originY);
    context3[p].moveTo(originX-a_star*scale[p] , originY-arrow_head/2);
    context3[p].lineTo(originX-a_star*scale[p]-arrow_head*0.7 , originY);
    context3[p].lineTo(originX-a_star*scale[p] , originY+arrow_head/2);
    context3[p].fill();
    context3[p].font = "italic 14px sans-serif";
    context3[p].fillText("a*", originX-a_star*scale[p]/2-font_size , originY-font_size/3 )

    // draw b star
    context3[p].beginPath();
    context3[p].strokeStyle="rgb(250, 100, 100)";
    context3[p].lineWidth=2;
    context3[p].moveTo(originX,originY);
    context3[p].lineTo(originX-b_star*cosGamma*scale[p], originY+b_star*sinGamma*scale[p]);
    context3[p].stroke();

    context3[p].beginPath();
    context3[p].lineWidth=1;
    context3[p].fillStyle="rgb(250, 100, 100)";

    var arrow_head_X = Array(3);
    var arrow_head_Y = Array(3);
    arrow_head_X[0]=-b_star*scale[p];
    arrow_head_Y[0]=-arrow_head/2.0;

    arrow_head_X[1]=-b_star*scale[p]-arrow_head*0.7;
    arrow_head_Y[1]=0.0;

    arrow_head_X[2]=-b_star*scale[p];
    arrow_head_Y[2]=arrow_head/2.0;

    for (var l=0;l<3;l+=1){
        var tempX=cosGamma*arrow_head_X[l]-sinGamma*arrow_head_Y[l];
        var tempY=sinGamma*arrow_head_X[l]+cosGamma*arrow_head_Y[l];
        arrow_head_X[l]=tempX;
        arrow_head_Y[l]=tempY;

    }
    context3[p].moveTo(originX+arrow_head_X[0] , originY-arrow_head_Y[0]);
    context3[p].lineTo(originX+arrow_head_X[1] , originY-arrow_head_Y[1]);
    context3[p].lineTo(originX+arrow_head_X[2] , originY-arrow_head_Y[2]);
    context3[p].fill();
    context3[p].font = "italic 14px sans-serif";
    context3[p].fillText("b*", originX+arrow_head_X[1]/2-font_size*1.4, originY-arrow_head_Y[1]/2+font_size );



    }


}
