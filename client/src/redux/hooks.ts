import { useDispatch, useSelector } from "react-redux";
import type { RootAppDispatch, RootGetState } from "./store";

export const useAppDispatch = useDispatch.withTypes<RootAppDispatch>();
export const useAppSelector = useSelector.withTypes<RootGetState>();
