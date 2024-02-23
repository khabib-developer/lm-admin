import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppStore } from "../../store/app.store";
import { emtyArray } from "../../constants";
import { Box, Grid, Skeleton } from "@mui/material";

export const Loading = () => {
  const { loading, setLoading } = useAppStore();

  const handleClose = () => setLoading(false);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

interface ILoadingItems {
  height: number;
  loading: boolean;
  wrapperheight: string;
}

export const LoadingItems = (props: ILoadingItems) => {
  return (
    <Box
      position="absolute"
      width="100%"
      height={props.wrapperheight}
      overflow="hidden"
      sx={{
        transition: "0.3s all linear;",
        opacity: Number(props.loading),
        zIndex: props.loading ? 10 : -1,
      }}
    >
      {emtyArray.map((_, i) => (
        <Skeleton
          key={i}
          sx={{ mb: 3, display: "block" }}
          variant="rounded"
          width="100%"
          height={props.height}
        />
      ))}
    </Box>
  );
};

export const LoadingHistory = (props: Omit<ILoadingItems, "height">) => {
  return (
    <Box
      position="absolute"
      width="100%"
      height={props.wrapperheight}
      overflow="hidden"
      sx={{
        transition: "0.2s all linear;",
        opacity: Number(props.loading),
        zIndex: props.loading ? 10 : -1,
      }}
    >
      {emtyArray.map((_, i) => (
        <Box height={100} key={i}>
          <Grid container gap={4}>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
              <Skeleton
                sx={{ display: "block" }}
                variant="rounded"
                width="30%"
                height={30}
              />
              <Skeleton
                sx={{ my: 1, display: "block" }}
                variant="rounded"
                width="100%"
                height={54}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export const LoadingUserInfo = (props: { loading: boolean }) => {
  return (
    <Box
      sx={{
        width: "calc(100% - 48px)",
        top: 0,
        position: "absolute",
        transition: "0.2s all linear;",
        opacity: Number(props.loading),
        zIndex: props.loading ? 10 : -1,
      }}
    >
      <Skeleton
        sx={{ display: "block", borderRadius: 4 }}
        variant="rounded"
        width="100%"
        height={265}
      ></Skeleton>
      <Skeleton
        sx={{ display: "block", mt: 3, borderRadius: 4 }}
        variant="rounded"
        width="100%"
        height="calc(100vh - 406px)"
      ></Skeleton>
    </Box>
  );
};
