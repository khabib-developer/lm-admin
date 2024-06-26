import { Divider, Grid, List, ListItemButton } from "@mui/material";
import { Box } from "@mui/system";
import { useSideBarHook } from "../../hooks/sideBar.hook";
import {
  MessageTypes,
  SentenceRoutes,
  roundBigNumbers,
  useAppStore,
} from "../../../../6.shared";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import {
  IQuantity,
  sentenceStatus,
  useSentenceStore,
} from "../../../../5.entities";

export const SentenceSideBar = () => {
  const { activeSection } = useSideBarHook();
  const sentenceStore = useSentenceStore();
  const navigate = useNavigate();
  const routes = useMemo(
    () => Object.keys(SentenceRoutes).filter((_, i) => i !== 0),
    []
  );
  const { notifications } = useAppStore();
  const properNounQty = useMemo(
    () =>
      notifications.filter((n) => n.type === MessageTypes.proper_nouns).length,
    [notifications]
  );

  const redLabel = useCallback((properNoun: boolean, others: boolean) => {
      return ((properNoun && properNounQty !== 0) || (sentenceStore.quantity[sentenceStatus.other] !== 0 &&others ) )
  }, [properNounQty, sentenceStore.quantity[sentenceStatus.other]])
  return (
    <Box
      width={240}
      borderRight="1px solid #3c3b3b"
      height="calc(100vh - 64px)"
      sx={{ bgcolor: "background.default", color: "text.primary" }}
    >
      <Divider />
      <List component="nav">
        {routes.map((route) => {
          const qty =
            sentenceStore.quantity[
              sentenceStatus[
                route as keyof typeof sentenceStatus
              ] as keyof IQuantity
            ];

          const properNoun = route === sentenceStatus.has_proper_noun;
          const others = route == sentenceStatus.other
          return (
            <ListItemButton
              key={route}
              sx={{ px: 3 }}
              selected={activeSection(route)}
              onClick={() => {
                navigate(route + "/1");
              }}
            >
              <Grid container>
                <Grid item xs={4} display="flex" justifyContent="start" alignItems='center'>
                  {properNoun ? "exceptions" : route}
                </Grid>
                <Grid item xs={4} display="flex" justifyContent="end" alignItems='center'>
                  -
                </Grid>
                <Grid item xs={4} display="flex" justifyContent="end">
                  <Box
                    sx={{
                      background:redLabel(properNoun, others)
                          ? "red"
                          : "transparent",
                      width: "25px",
                      height:"25px",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      textAlign: "center",
                      borderRadius: "50%",
                      overflow:'hidden',
                      textOverflow:"ellipsis",
                      whiteSpace:"nowrap",
                      fontSize:"11px"

                    }}
                  >
                    {roundBigNumbers(properNoun ? properNounQty : qty)}
                  </Box>
                </Grid>
              </Grid>
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};
