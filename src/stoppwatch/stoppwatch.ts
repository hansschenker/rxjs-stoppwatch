// const startButton = document.querySelector('#start')

// const stopButton = document.querySelector('#stop')

// e

// const resetButton = document.querySelector('#reset')

// const start$ = Rx.Observable.fromEvent (startButton, 'click') const stop$= Rx.Observable.fromEvent (stopButton, 'click')


// const reset$ = Rx.Observable.fromEvent (resetButton, 'click')


// const interval$ = Rx.Observable.interval(1000)

// const stoporReset$ = Rx.Observable.merge(stops,reset$)

// const pausible$ = interval$.takeUntil(stoporReset$)



// const initialValue = 0

// const inc =( acc:number) => acc+1

// const reset =( acc:number) => initialValue

// const incorReset$ = Rx.Observable.merge(

// pausible$.mapTo(inc),

// resets.mapTo(reset)

// app$ = start$

// switchMapTo (incorReset$)

// .startWith(init)

// .scan((acc, currFunc) => currFunc(acc))

// .subscribe(val => console.log(val))

