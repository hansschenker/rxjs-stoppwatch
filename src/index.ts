import {
  fromEvent,
  interval,
  mapTo,
  merge,
  scan,
  startWith,
  switchMapTo,
  takeUntil,
  tap,
} from "rxjs";

 const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stopp");
const resetButton = document.querySelector("#reset");

const start$ = fromEvent(startButton!, "click")
const stop$ = fromEvent(stopButton!, "click");
const reset$ = fromEvent(resetButton!, "click");

const interval$ = interval(1000)

const stopOrReset$ = merge(stop$, reset$);

const pausible$ = interval$.pipe(takeUntil(stopOrReset$))


const initialValue = 0;

const inc = (acc: number): number => acc + 1;
const reset = (acc: number):number => 0;

const incOrReset$ = merge(
    pausible$.pipe(mapTo(inc)),
    reset$.pipe(mapTo(reset))
);

reset$.pipe(mapTo(reset));

const app$ = start$.pipe(
    switchMapTo(incOrReset$),
    startWith(initialValue),
    // @ts-ignore
    scan((acc, curr) => curr(acc))
  )

app$//.subscribe(console.log)