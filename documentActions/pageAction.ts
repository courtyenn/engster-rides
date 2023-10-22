// import { DocumentActionComponent } from "sanity";

export const MyCustomActions = (prev, context) => {
  if (context.schemaType === "page") {
    return prev.filter((action) => {
      return action.name === "PublishAction";
    });
  } else {
    return prev;
  }

  // return [...defaultResolve(props)];
};
