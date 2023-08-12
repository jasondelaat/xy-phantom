; function x2_vec_slices() {
    ; let slider = document.getElementById('x2-slices-slider')
    ; slider.addEventListener('input', () => {
        ; let v = Number.parseFloat(slider.value)
        ; label = 'α = ' + v.toFixed(1)
        ; document.getElementById('x2-slider-label').textContent = label
    })
    ; slider.value = 1
    ; let g = Graph(-5, 5, -5, 5, 300, 300)
    ; let phantoms = {
        draw(ctx) {
            ; let a = slider.value
            ; ctx.lineWidth = 3
            ; ctx.strokeStyle = 'purple'
            ; ctx.beginPath()
            ; for (let im=g.min_x; im < g.max_x; im += g.dx) {
                ; let x = 2*a*im
                ; let y = -a*a - im*im
                ; let p = g.graph2screen(x, y)
                ; ctx.lineTo(p.x, p.y)
            }
            ; ctx.stroke()
        }
    }
    ; let a = Animation(300, 300)
          .Background(g)
          .Background(g.Plot((x) => x*x, 'blue'))
          //.Background(g.Text('x', 4, 0.2))
          //.Background(g.Text('y', 0.2, 4.2))
          .Scene()
          .Shot(1000)
          .Actor(Static(phantoms))
          .Action(pass, 0, 1)
          .Cut()
          .EndScene()
          .EndAnimation()

    ; a.run('x2-slices')
}

; x2_vec_slices()
