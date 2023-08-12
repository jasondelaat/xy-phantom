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
