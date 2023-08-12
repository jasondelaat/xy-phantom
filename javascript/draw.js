; typeclass('draw')

//// AnimationObject ----------------------------------------------------------------
//; AnimationObject.draw = function(ctx) {
//    ; ctx.beginPath()
//    ; ctx.moveTo(0, 0)
//    ; ctx.lineTo(300, 300)
//    ; ctx.stroke()
//}
//// end AnimationObject ------------------------------------------------------------






// Point -----------------------------------------------------------------------
; Point.draw = function(ctx) {
    ; ctx.fillStyle = this.color
    ; ctx.beginPath()
    ; ctx.arc(this.x, this.y, 5, 0, 2*Math.PI)
    ; ctx.fill()
}
// end Point -------------------------------------------------------------------






// Graph -----------------------------------------------------------------------
; _Graph.draw = function(ctx) {
    ; let w = - this.min_x / this.dx
    ; let h = this.max_y / this.dy
    ; ctx.fillStyle = 'white'
    ; ctx.fillRect(0, 0, 2*w, 2*h)
    ; ctx.lineWidth = 1
    ; ctx.strokeStyle = 'black'
    ; ctx.strokeRect(0, 0, this.width, this.height)
    ; ctx.strokeStyle = 'darkgray'
    ; for (let x = Math.floor(this.min_x); x < this.max_x; x++) {
        ; ctx.beginPath()
        ; ctx.moveTo((x - this.min_x)/this.dx, h-5)
        ; ctx.lineTo((x - this.min_x)/this.dx, h+5)
        ; ctx.stroke()
    }
    ; for (let y = Math.floor(this.min_y); y < this.max_y; y++) {
        ; ctx.beginPath()
        ; ctx.moveTo(w-5, (y - this.min_y)/this.dy)
        ; ctx.lineTo(w+5, (y - this.min_y)/this.dy)
        ; ctx.stroke()
    }
    ; ctx.strokeStyle = 'black'
    ; ctx.beginPath()
    ; ctx.moveTo(w, 0)
    ; ctx.lineTo(w, this.height)
    ; ctx.stroke()
    ; ctx.beginPath()
    ; ctx.moveTo(0, h)
    ; ctx.lineTo(this.width, h)
    ; ctx.stroke()
    ; ctx.fillStyle = 'darkgray'
    ; ctx.font = '10pt sans'
    ; ctx.fillText(this.min_x, 5, h + 13)
    ; ctx.fillText(this.max_x, this.width - 10, h + 13)
    ; ctx.fillText(this.min_y, w + 5, this.height - 5)
    ; ctx.fillText(this.max_y, w + 5, 13)
}
// end Graph -------------------------------------------------------------------






// Plot ------------------------------------------------------------------------
; Plot.draw = function(ctx) {
    ; ctx.strokeStyle = this.color
    ; ctx.lineWidth = 3
    ; ctx.beginPath()
    ; if (this.rot) {
        ; for (let y = this.graph.min_y; y < this.graph.max_y; y += this.graph.dy) {
            ; let coord = this.function(y)
            ; ctx.lineTo(coord.y, coord.x)
        }
    } else {
        ; for (let x = this.graph.min_x; x < this.graph.max_x; x += this.graph.dx) {
            ; let coord = this.function(x)
            ; ctx.lineTo(coord.x, coord.y)
        }
    }
    ; ctx.stroke()
}
// end Plot --------------------------------------------------------------------






// Text ------------------------------------------------------------------------
; Text.draw = function(ctx) {
    ; ctx.fillStyle = this.color || 'black'
    ; ctx.font = '13pt sans'
    ; ctx.fillText(this.str, this.x, this.y)
}
// end Text --------------------------------------------------------------------



// x(-x + y) = (-1 + xy)/sqrt(2)



// Vector --------------------------------------------------------------------
; Vector.draw = function(ctx) {
    ; const origin = this.graph.graph2screen(0, 0)
    ; ctx.strokeStyle = this.color
    ; ctx.lineWidth = 3
    ; ctx.beginPath()
    ; ctx.moveTo(origin.x, origin.y)
    ; ctx.lineTo(this.x, this.y)
    ; ctx.stroke()
}
// end Vector ----------------------------------------------------------------






// FreeVector ---------------------------------------------------------------
; FreeVector.draw = function(ctx) {
    ; ctx.strokeStyle = this.color
    ; ctx.lineWidth = 3
    ; ctx.beginPath()
    ; ctx.moveTo(this.x1, this.y1)
    ; ctx.lineTo(this.x2, this.y2)
    ; ctx.stroke()
}
// end FreeVector -----------------------------------------------------------






// Polygon -------------------------------------------------------------------
; Polygon.draw = function(ctx) {
    ; ctx.fillStyle = this.color
    ; ctx.beginPath()
    ; ctx.moveTo(this.points[0].x, this.points[0].y)
    ; for (let i=1; i < this.points.length; i++) {
        ; ctx.lineTo(this.points[i].x, this.points[i].y)
    }
    ; ctx.closePath()
    ; ctx.fill()
}
// end Polygon ---------------------------------------------------------------






// Arc ----------------------------------------------------------------------
; Arc.draw = function(ctx) {
    ; ctx.strokeStyle = this.color
    ; ctx.lineWidth = 1
    ; ctx.beginPath()
    ; ctx.moveTo(this.sx, this.sy)
    ; ctx.arcTo(this.x1, this.y1, this.x2, this.y2, this.mag)
    ; ctx.stroke()
}
// end Arc ------------------------------------------------------------------






// Circle --------------------------------------------------------------------
; Circle.draw = function(ctx) {
    ; ctx.strokeStyle = this.color
    ; ctx.lineWidth = 3
    ; ctx.beginPath()
    ; ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI)
    ; ctx.stroke()
}
// end Circle ----------------------------------------------------------------
