; function x2_slices_complex() {
    ; let slider = document.getElementById('x2-slices-complex-slider')
    ; slider.value = 1
    ; slider.addEventListener('input', () => {
        ; let v = Number.parseFloat(slider.value)
        ; label = 'α = ' + v.toFixed(1)
        ; document.getElementById('x2-complex-slider-label').textContent = label
    })
    ; let g = Graph(-5, 5, -5, 5, 300, 300)
    ; let phantoms = {
        draw(ctx) {
            ; let a = slider.value
            ; ctx.strokeStyle = 'green'
            ; ctx.lineWidth = 3
            ; ctx.beginPath()
            ; for (let im=g.min_x; im < g.max_x; im += g.dx) {
                ; let y = a*a - im*im
                ; let p = g.graph2screen(im, y)
                ; ctx.lineTo(p.x, p.y)
            }
            ; ctx.stroke()
            ; ctx.strokeStyle = 'dodgerblue'
            ; ctx.beginPath()
            ; for (let x=g.min_x; x < g.max_x; x += g.dx) {
                ; let y = 2*a*x
                ; let p = g.graph2screen(x, y)
                ; ctx.lineTo(p.x, p.y)
            }
            ; ctx.stroke()
        }
    }
    ; let a = Animation(300, 300)
          .Background(g)
          .Scene()
          .Shot(1000)
          .Actor(Static(phantoms))
          .Action(pass, 0, 1)
          .Cut()
          .EndScene()
          .EndAnimation()

    ; a.run('x2-slices-complex')
}

; x2_slices_complex()
