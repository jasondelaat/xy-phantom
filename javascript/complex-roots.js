; function complex_roots() {
    ; let slider = document.getElementById('complex-roots-a')
    ; slider.value = 0
    ; slider.addEventListener('input', () => {
        ; let v = Number.parseFloat(slider.value)
        ; label = 'a = ' + v.toFixed(1)
        ; document.getElementById('complex-roots-a-label').textContent = label
    })
    ; let g = Graph(-5, 5, -1, 9, 250, 250)
    ; let phantoms = {
        draw(ctx) {
            ; let a = slider.value
            ; ctx.strokeStyle = 'green'
            ; ctx.lineWidth = 3
            ; ctx.beginPath()
            ; for (let im=g.min_x; im < g.max_x; im += g.dx) {
                ; let y = a*a - im*im - 2*a + 5
                ; let p = g.graph2screen(im, y)
                ; ctx.lineTo(p.x, p.y)
            }
            ; ctx.stroke()
            ; ctx.strokeStyle = 'dodgerblue'
            ; ctx.beginPath()
            ; for (let x=g.min_x; x < g.max_x; x += g.dx) {
                ; let y = 2*a*x -2*x 
                ; let p = g.graph2screen(x, y)
                ; ctx.lineTo(p.x, p.y)
            }
            ; ctx.stroke()
        }
    }
    ; let a = Animation(250, 250)
          .Background(g)
          .Scene()
          .Shot(1000)
          .Actor(Static(phantoms))
          .Action(pass, 0, 1)
          .Cut()
          .EndScene()
          .EndAnimation()

    ; a.run('complex-roots')
}

; complex_roots()
