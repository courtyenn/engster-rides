export const MyCustomActions = (prev: any, context: any) => {
  if (context.schemaType === "page") {
    return prev.filter((action: any) => {
      return action.name === "PublishAction";
    });
  } else {
    return prev;
  }
};
