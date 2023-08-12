; Point = type('x y color graph')
; Plot = type('function color rot graph')
; Text = type('str x y color graph')
; Vector = type('x y color graph')
; vector = type('x y')
; FreeVector = type('x1 y1 x2 y2 color graph')
; Polygon = type('points color graph')
; Arc = type('sx sy x1 y1 x2 y2 mag color graph')
; Circle = type('x y r color graph')
; _Graph = type('min_x max_x min_y max_y width height')
; function Graph(min_x, max_x, min_y, max_y, width, height) {
    ; let g = _Graph(min_x, max_x, min_y, max_y, width, height)
    ; g.dx = (max_x - min_x) / width
    ; g.dy = (max_y - min_y) / height
    ; return g
}

; _Graph.Point = function(x, y, color) {
    ; color = color || 'blue'
    ; let coords = this.graph2screen(x, y)
    ; return Point(coords.x, coords.y, color, this)
}

; _Graph.graph2screen = function(x, y) {
    ; return {
        x : (x-this.min_x)/this.dx,
        y : this.height - (y-this.min_y)/this.dy
    }
}

; _Graph.Plot = function(f, color, rot) {
    ; color = color || 'blue'
    ; let self = this
    ; let _ = function(x) {
        ; return self.graph2screen(x, f(x))
    }
    ; return Plot(_, color, rot, this)
}

; _Graph.Text = function(str, x, y, color) {
    ; color = color || 'black'
    ; let coords = this.graph2screen(x, y)
    ; return Text(str, coords.x, coords.y, color, this)
}

; _Graph.Vector = function(x, y, color, graph) {
    ; color = color || 'blue'
    ; let coords = this.graph2screen(x, y)
    ; return Vector(coords.x, coords.y, color, this)
}


; function Static(e) {
    ; return () => e
}

; Vector.to_normalized_vector = function() {
    ; return vector(this.x, this.y).normalize()
}

; vector.rotate = function(angle) {
    ; const ca = Math.cos(angle)
    ; const sa = Math.sin(angle)
    ; const x = this.x*ca - this.y*sa
    ; const y = this.x*sa + this.y*ca
    ; return vector(x, y)
}

; vector.magnitude = function() {
    ; return Math.sqrt(this.x*this.x + this.y*this.y)
}

; vector.normalize = function() {
    ; const m = this.magnitude()
    ; return vector(this.x/m, this.y/m)
}

; _Graph.FreeVector = function(x1, y1, x2, y2, color) {
    ; color = color || 'blue'
    ; const coords1 = this.graph2screen(x1, y1)
    ; const coords2 = this.graph2screen(x2, y2)
    ; return FreeVector(coords1.x, coords1.y, coords2.x, coords2.y, color, this)
}

; _Graph.Poly = function(points, color) {
    ; let real_points = []
    ; for (let p of points) {
        ; real_points.push(this.graph2screen(p.x, p.y))
    }
    ; return Polygon(real_points, color, this)
}

; _Graph.Arc = function(sx, sy, x1, y1, x2, y2, color) {
    ; let s = this.graph2screen(sx, sy)
    ; let p1 = this.graph2screen(x1, y1)
    ; let p2 = this.graph2screen(x2, y2)
    ; let mag = Math.sqrt(Math.pow(s.x - p1.x, 2) + Math.pow(s.y - p1.y, 2))
    ; return Arc(s.x, s.y, p1.x, p1.y, p2.x, p2.y, mag, color, this)
}

; _Graph.Circle = function(x, y, r, color) {
    ; color = color || 'blue'
    ; let p = this.graph2screen(x, y)
    ; let rad = r / this.dx
    ; return Circle(p.x, p.y, rad, color, this)
}
