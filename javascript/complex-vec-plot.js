; function complex_roots() {
    ; let slider = document.getElementById('complex-roots-a')
    ; slider.addEventListener('input', () => {
        ; let v = Number.parseFloat(slider.value)
        ; label = 'α = ' + v.toFixed(1)
        ; document.getElementById('complex-roots-a-label').textContent = label
    })
    ; slider.value = 0
    ; let g = Graph(-5, 5, -1, 9, 250, 250)
    ; let phantoms = {
        draw(ctx) {
            ; let a = slider.value
            ; ctx.lineWidth = 3
            ; ctx.strokeStyle = 'purple'
            ; ctx.beginPath()
            ; for (let im=g.min_x; im < g.max_x; im += g.dx) {
                ; let x = 2*a*im -2*im
                ; let y = a*a - im*im -2*a + 5
                ; let p = g.graph2screen(x, y)
                ; ctx.lineTo(p.x, p.y)
            }
            ; ctx.stroke()
        }
    }
    ; let a = Animation(250, 250)
          .Background(g)
          .Background(g.Plot((x) => x*x -2*x + 5, 'blue'))
          //.Background(g.Text('x', 4, 0.2))
          //.Background(g.Text('y', 0.2, 4.2))
          .Scene()
          .Shot(1000)
          .Actor(Static(phantoms))
          .Action(pass, 0, 1)
          .Cut()
          .EndScene()
          .EndAnimation()

    ; a.run('complex-vec-plot')
}

; complex_roots()
//; complex_roots('complex-roots-combined-a', true)
