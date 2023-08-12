; function typeclass(names) {
    ; for (let n of names.split(' ')) {
        ; window[n] = function(o) {
            ; let args = Array.prototype.slice.call(arguments, 1)
            ; return o[n].apply(o, args)
        }
    }
}

; function type(attributes) {
    ; let attribs = attributes.split(' ')
    ; let cons = function() {
        ; let o = Object.create(cons)
        ; for (let i=0; i < attribs.length; i++) {
            ; o[attribs[i]] = arguments[i]
        }
        ; return o
    }
    ; return cons
}

//-----------------------------------------------------------------------------
// Types 
//-----------------------------------------------------------------------------
; Action = type('position_function start end')
; Actor = type('parent object_function action_list action_index')
; _Animation = type('width height scene_list scene_index')
//; AnimationObject = type('')
//; Point = type('x y')
; _Scene = type('parent shot_list shot_index')
; Shot = type('parent duration actor_list timer')
; Timer = type('')

// Timer ---------------------------------------------------------------------
; Timer.getTime = function() {
    ; let date = new Date()
    ; if (!this.start) {
        ; this.start = date.getTime()
        ; return 0
    }
    ; return (date.getTime() - this.start) / 1000
}
; Timer.reset = function() {
    ; this.start = null
}
// end Timer -----------------------------------------------------------------







// Animation ----------------------------------------------------------------
; function Animation(width, height) {
    //('width height scene_list scene_index')
    ; let a = _Animation(width, height, [], 0)
    ; a.bg = document.createElement('canvas')
    ; a.bg.width = width
    ; a.bg.height = height
    ; a.fg = document.createElement('canvas')
    ; a.fg.width = width
    ; a.fg.height = height
    ; a.dynamic = document.createElement('canvas')
    ; a.dynamic.width = width
    ; a.dynamic.height = height
    ; return a
}

; function initialize_canvas(id, w, h) {
    ; if (typeof id == 'string') {
        ; can = document.getElementById(id)
    } else {
        ; can = id
    }
    ; can.width = w
    ; can.height = h
    ; can.style.border = '1px solid black'
    ; return can.getContext('2d')
}

; _Animation.run = function(canvas_id) {
    ; let self = this
    ; this.context = initialize_canvas(canvas_id, this.width, this.height)
    ; function _() {
        ; let scene = self.scene_list[self.scene_index]
        ; self.dynamic.getContext('2d').clearRect(0, 0, self.width, self.height)
        ; if (scene && scene.run(self.dynamic.getContext('2d'))) {
            ; self.scene_index += 1
            ; scene = self.scene_list[self.scene_index]
        }
        ; self.context.clearRect(0, 0, self.width, self.height)
        ; self.context.drawImage(self.bg, 0, 0)
        ; if (scene && !isCanvasBlank(scene.bg)) {
            ; self.context.drawImage(scene.bg, 0, 0)
        }
        ; self.context.drawImage(self.dynamic, 0, 0)
        ; if (scene && !isCanvasBlank(scene.fg)) {
            ; self.context.drawImage(scene.fg, 0, 0)
        }
        ; self.context.drawImage(self.fg, 0, 0)
        ; if (self.scene_index >= self.scene_list.length) {
            ; self.reset()
        }
        ; requestAnimationFrame(_)
    } 
    ; requestAnimationFrame(_)
}

; _Animation.reset = function() {
    ; this.scene_index = 0
    ; for (let s of this.scene_list) {
        ; s.reset()
    }
}

; _Animation.Scene = function() {
    //('parent shot_list shot_index')
    ; let scene = Scene(this, [], 0, 0)
    ; this.scene_list.push(scene)
    ; return scene
}
; _Animation.EndAnimation = function() {
    ; this.Scene = null
    ; this.EndAnimation = null
    ; return this
}
; _Animation.Background = function(bg) {
    ; draw(bg, this.bg.getContext('2d'))
    ; return this
}
; _Animation.Foreground = function(fg) {
    ; draw(fg, this.fg.getContext('2d'))
    ; return this
}
// end Animation ------------------------------------------------------------





// Scene ---------------------------------------------------------------------
; function Scene(parent, shot_list, shot_index) {
    //('parent shot_list shot_index')
    ; let s = _Scene(parent, shot_list, shot_index)
    ; s.bg = document.createElement('canvas')
    ; s.bg.width = parent.width
    ; s.bg.height = parent.height
    ; s.fg = document.createElement('canvas')
    ; s.fg.width = parent.width
    ; s.fg.height = parent.height
    ; return s
}

; _Scene.reset = function() {
    ; this.shot_index = 0
    ; for (let s of this.shot_list) {
        ;  s.reset()
    }
}

; _Scene.run = function(ctx) {
    ; if (this.shot_index < this.shot_list.length) {
        ; let shot = this.shot_list[this.shot_index]
        ; if (shot.run(ctx)) {
            ; this.shot_index += 1
        } 
    } else {
        ; return true
    }
}

; _Scene.Shot = function(dur) {
    //('parent duration actor_list')
    ; let shot = Shot(this, dur, [], Timer())
    ; this.shot_list.push(shot)
    ; return shot
}
; _Scene.EndScene = function() {
    ; return this.parent
}
; _Scene.Background = _Animation.Background
; _Scene.Foreground = _Animation.Foreground
// end Scene -----------------------------------------------------------------





// Shot ---------------------------------------------------------------------
; Shot.run = function(ctx) {
    ; let t = this.timer.getTime()
    ; if (t > this.duration) {
        ; for (let actor of this.actor_list) {
            ; actor.run(1, ctx)
        }
        ; return true
    } else {
        ; for (let actor of this.actor_list) {
            ; actor.run(t/this.duration, ctx)
        }
    }
}

; Shot.reset = function() {
    ; this.timer = Timer()
}

; Shot.Actor = function(obj) {
    //('parent object_function action_list action_index')
    ; let actor = Actor(this, obj, [], 0)
    ; this.actor_list.push(actor)
    ; return actor
}
; Shot.Cut = function() {
    ; return this.parent
}
// end Shot -----------------------------------------------------------------





// Actor ---------------------------------------------------------------------
; Actor.run = function(t, ctx) {
    ; for (let action of this.action_list) {
        ; if (action.start <= t && t <= action.end)  {
            ; action.run(t, this.object_function, ctx)
        }
    }
}

; Actor.Action = function(pos_f, start, end) {
    //('position_function start end')
    ; let action = Action(pos_f, start, end)
    ; this.action_list.push(action)
    ; return this
}
; Actor.Actor = function(obj) {
    ; let actor = Actor(this.parent, obj, [], 0, 0)
    ; this.parent.actor_list.push(actor)
    ; return actor
}
; Actor.Cut = function() {
    ; return this.parent.parent
}
// end Actor -----------------------------------------------------------------





// Action --------------------------------------------------------------------
; Action.run = function(t, obj_func, ctx) {
    ; let position = this.position_function((t - this.start)/(this.end - this.start))
    ; let obj = obj_func(position)
    ; draw(obj, ctx)
}
// end Action ----------------------------------------------------------------

