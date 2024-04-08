import { Pagination, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

interface IComponent {
  count: number;
  fn: (offset: number) => void;
}
export const PaginationComponent = (props: IComponent) => {
  const { offset } = useParams();
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) =>
    props.fn(value);

  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        count={props.count}
        onChange={handleChange}
        page={Number(offset) || 1}
      />
    </Stack>
  );
};
