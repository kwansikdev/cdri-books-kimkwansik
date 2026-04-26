import {
  createQueryKeys,
  mergeQueryKeys,
} from "@lukemorales/query-key-factory";

const search = createQueryKeys("search", {
  // 목록
  book: (props) => [{ ...props }],
});

/* -------------------------------------------------------------------------- */
/*                                   export                                   */
/* -------------------------------------------------------------------------- */
const query = mergeQueryKeys(search);

export default query;
