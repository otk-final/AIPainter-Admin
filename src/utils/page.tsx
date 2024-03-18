import { PaginationProps } from "antd"

/**
 * 标准分页对象
 */
export interface PageQuery {
    /**
     * 当前页码
     */
    page: number
    /**
     * 每页数量
     */
    size: number
    /**
     * 查询参数
     */
    params?: any
}


export interface PageData<T> {
    /**
     * 总记录数
     */
    totalCount?: number
    /**
     * 总页数
     */
    totalPages?: number
    /**
     * 当前页码
     */
    page?: number
    /**
     * 每页数量
     */
    size?: number
    /**
     * 数据
     */
    entities?: T[]
}



export const GetPageQuery = (params: any, props: PaginationProps): PageQuery => {
    return { page: props.current!, size: Number(props.size), params: params }
}


export const GetPaginationProps = (result: PageData<any>, def: PaginationProps): PaginationProps => {
    // if (!def) {
    //     def = {}
    // }
    //update
    return { ...def, current: result.page, pageSize: result.size, total: result.totalCount }
}


interface ApiPaginationProps {
    page?: number,
    size?: number,
    total?: number,
    onChange?: (page: number, pagesize: number) => void
}



export function ApiPagination(props: ApiPaginationProps): PaginationProps {
    /**
     * 后端 page 从0 开始，antd 页面显示从1开始
     * @param page 
     * @param pageSize 
     */
    const onChangeHandle = (page: number, pageSize: number) => {
        //通知父组件
        props.onChange!(page, pageSize)
    }
    let antdCurrent = props.page ? props.page + 1 : 1


    //分页组件
    let antdPage: PaginationProps = {
        current: antdCurrent,
        pageSize: props?.size,
        total: props?.total,
        pageSizeOptions: [10, 20, 50, 100], // 每页显示多少条
        showSizeChanger: true, // 展示 pageSize 切换器
        // showQuickJumper: true, // 快速跳转至某页
        showTotal: (total) => `共有 ${total} 条数据`,
        onChange: onChangeHandle,
        onShowSizeChange: onChangeHandle
    }
    return antdPage;
}
