export const Copy = {
  pick: function (
    target: Record<string, unknown>,
    origin: Record<string, unknown>,
    ...props: Array<string>
  ): Record<string, unknown> {
    props.forEach(v => (target[v] = origin[v]));
    return target;
  },
};
