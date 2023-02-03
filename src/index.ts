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

type Time = {
    minutes: number;
    seconds: number;
    milliseconds: number;
}
// time display
const minutes = document.querySelector('#minutes')
const seconds = document.querySelector('#seconds')
const milliseconds = document.querySelector('#milliseconds')

const msToTime = (ms:number): Time => {
    return ({
        minutes: Math.floor(ms / 6000),
        seconds: Math.floor((ms / 100) % 60),
        milliseconds: Math.floor(ms % 100),
    })
}
const pad0 = (n:number) => n <= 9? ('0' + n): n.toString()

    function render(time: { minutes: number; seconds: number; milliseconds: number; }): void {
    minutes!.innerHTML = pad0(time.minutes);
    seconds!.innerHTML = pad0(time.seconds);
    milliseconds!.innerHTML = pad0(time.milliseconds);
}
// buttons
const startButton = document.querySelector("#start") as HTMLButtonElement;
const stopButton = document.querySelector("#stopp")  as HTMLButtonElement;
const resetButton = document.querySelector("#reset")  as HTMLButtonElement;

const start$ = fromEvent(startButton!, "click").pipe(
    tap(() => {
        startButton!.textContent ="Resume";
        startButton!.disabled = true
    })
)
const stop$ = fromEvent(stopButton!, "click").pipe(
    tap(() => {
        startButton!.disabled = false;
    })
)
const reset$ = fromEvent(resetButton!, "click").pipe(
    tap(() => {
        startButton!.textContent ="Start";
        startButton!.disabled = false;
    })
)

const interval$ = interval(1000 /60)

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

app$.subscribe(ms => render(msToTime(ms)))