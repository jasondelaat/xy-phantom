; function roots_of_unity(mags) {
    ; let q = (x) => (b) => Math.pow(x, 5) - 1 -10*Math.pow(x, 3)*Math.pow(b, 2) +5*x*Math.pow(b, 4)
    ; let p = (x) => (b) => 5*Math.pow(x, 4)*b - 10*Math.pow(x, 2)*Math.pow(b, 3) + Math.pow(b, 5)
    ; let slider = document.getElementById('unity-a')
    ; slider.value = 0
    ; slider.addEventListener('input', () => {
        ; let a = slider.value
        ; let b = ''
        ; if (a == 1) {
            ; b = '0'
        } else if (a == 0.3) {
            ; b = '±0.944'
        } else if (a == -0.8) {
            ; b = '±0.592'
        }
        ; label.innerText = 'α = '+slider.value+'\n'+(b == '' ? ' ' : 'b = '+b)
    })
    ; let label =  document.getElementById('unity-a-label')
    ; label.innerText = 'α = '+slider.value+'\n '
    ; label.b = 100000
    ; let g = Graph(-2, 2, -2, 2, 250, 250)
    ; let a = Animation(250, 250)
          .Background(g)
          //.Background(g.Plot((x) => Math.pow(x, 5) - 1, 'blue'))
          .Scene()
          .Shot(100000)
          .Actor(() => {
              ; return {
                  draw(ctx) {
                      ; let a = parseFloat(slider.value)
                      ; ctx.lineWidth = 3
                      ; if (mags) {
                          ; ctx.strokeStyle = 'orchid'
                          ; ctx.beginPath()
                          ; for (let t = g.min_x; t < g.max_x; t += g.dx) {
                              ; let x = p(a)(t)
                              ; let y = q(a)(t)
                              ; let mag = Math.sqrt(x*x + y*y)
                              ; let pt = g.graph2screen(t, mag)
                              ; ctx.lineTo(pt.x, pt.y)
                          }
                      } else {
                          ; ctx.strokeStyle = 'purple'
                          ; ctx.beginPath()
                          ; for (let t = g.min_x; t < g.max_x; t += g.dx) {
                              ; let x = p(a)(t)
                              ; let y = q(a)(t)
                              ; let pt = g.graph2screen(x, y)
                              ; ctx.lineTo(pt.x, pt.y)
                          }
                      }
                      ; ctx.stroke()
                  }
              }
          })
          .Action(pass, 0, 1)
          .Cut()
          .EndScene()
          .EndAnimation()

    ; if (mags) {
        ; a.run('roots-of-unity-magnitudes')
    } else {
        ; a.run('roots-of-unity-vectors')
    }
}

; function roots_of_unity_imaginary() {
    ; let label =  document.getElementById('unity-a-label')
    ; let slider = document.getElementById('unity-a')
    ; let p = (x) => (b) => Math.pow(x, 5) - 1 -10*Math.pow(x, 3)*Math.pow(b, 2) +5*x*Math.pow(b, 4)
    ; let q = (x) => (b) => 5*Math.pow(x, 4)*b - 10*Math.pow(x, 2)*Math.pow(b, 3) + Math.pow(b, 5)
    ; let g = Graph(-2, 2, -2, 2, 250, 250)
    ; let a = Animation(250, 250)
          .Background(g)
          .Scene()
          .Shot(100000)
          .Actor(() => {
              ; return {
                  draw(ctx) {
                      ; let a = parseFloat(slider.value)
                      ; ctx.strokeStyle = 'green'
                      ; ctx.lineWidth = 3
                      ; ctx.beginPath()
                      ; for (let t = g.min_x; t < g.max_x; t += g.dx) {
                          ; let x = p(a)(t)
                          ; let pt = g.graph2screen(t, x)
                          ; ctx.lineTo(pt.x, pt.y)
                      }
                      ; ctx.stroke()
                      ; ctx.strokeStyle = 'dodgerblue'
                      ; ctx.lineWidth = 3
                      ; ctx.beginPath()
                      ; for (let t = g.min_x; t < g.max_x; t += g.dx) {
                          ; let y = q(a)(t)
                          ; let pt = g.graph2screen(t, y)
                          ; ctx.lineTo(pt.x, pt.y)
                      }
                      ; ctx.stroke()
                  }
              }
          })
          .Action(pass, 0, 1)
          .Cut()
          .EndScene()
          .EndAnimation()

    ; a.run('roots-of-unity-imaginary')
}

; roots_of_unity()
; roots_of_unity(true)
; roots_of_unity_imaginary()
