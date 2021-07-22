


export interface formFieldConfig {
    [inputProps: string]: string
}
export interface formField {
    [configuration: string]: formFieldConfig
}
export interface formConfigs {
    [config: string]: formField
}
export interface formProps {
    fields: formConfigs
    post: any
    cancelShow: any
    title: string
    InitialState?: any
}
export interface formState {
    [name: string]: string
}
export type form = (props: formProps) => JSX.Element | null