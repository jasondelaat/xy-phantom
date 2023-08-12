; function fangs() {
    ; let label =  document.getElementById('fangs-a-label')
    ; label.b = 100000
    ; let slider = document.getElementById('fangs-a')
    ; slider.value = 0
    ; slider.addEventListener('input', () => {
        ; let a = slider.value
        ; label.innerText = 'α = '+a+(a == -2 ? '\nβ = ±3' : '\n ')
    })
    ; let f = (x) => x*x + 4*x + 13
    ; let p = (a) => (b) => b*(2*a + 4)
    ; let q = (a) => (b) => f(a) - b*b

    ; let g = Graph(-10, 10, -2, 18, 300, 300)
    ; let a = Animation(300, 300)
          .Background(g)
          .Background(g.Plot(f, 'blue'))
          .Scene()
          .Shot(100000)
          .Actor(() => {
              ; return {
                  draw(ctx) {
                      ; let a = parseFloat(slider.value)
                      ; ctx.strokeStyle = 'orchid'
                      ; ctx.lineWidth = 3
                      ; ctx.beginPath()
                      ; for (let t = g.min_x; t < g.max_x; t += g.dx) {
                          ; let x = p(a)(t)
                          ; let y = q(a)(t)
                          ; let mag = Math.sqrt(x*x + y*y)
                          ; let pt = g.graph2screen(t, mag)
                          ; ctx.lineTo(pt.x, pt.y)
                      }
                      ; ctx.stroke()
                      //; ctx.strokeStyle = 'purple'
                      //; ctx.lineWidth = 3
                      //; ctx.beginPath()
                      //; for (let t = g.min_x; t < g.max_x; t += g.dx) {
                      //    ; let x = p(a)(t)
                      //    ; let y = q(a)(t)
                      //    ; let pt = g.graph2screen(x, y)
                      //    ; ctx.lineTo(pt.x, pt.y)
                      //}
                      //; ctx.stroke()
                  }
              }
          })
          .Action(pass, 0, 1)
          .Cut()
          .EndScene()
          .EndAnimation()

    ; a.run('fangs')
}

; fangs()
