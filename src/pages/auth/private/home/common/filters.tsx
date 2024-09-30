import { Form, Input, Button } from "antd";
function Filters({
  filters,
  setFilters,
  onFilters,
}: {
  filters: any;
  setFilters: any;
  onFilters(filters: any): void;
}) {
  return (
    <Form layout="vertical" className="grid grid-cols-3 gap-5 items-end">
      <Form.Item label="Event Name">
        <Input
          value={filters.searchText}
          onChange={(e: any) =>
            setFilters({ ...filters, searchText: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Date">
        <Input
          type="Date"
          value={filters.date}
          onChange={(e: any) =>
            setFilters({ ...filters, date: e.target.value })
          }
        />
      </Form.Item>
      <div className="flex gap-5">
        <Button
          onClick={() => setFilters({ searchText: "", date: "" })}
          disabled={!filters.searchText && !filters.date}
        >
          Clear Filters
        </Button>
        <Button
          type="primary"
          disabled={!filters.searchText && !filters.date}
          onClick={() => onFilters(filters)}
        >
          Apply Filters
        </Button>
      </div>
    </Form>
  );
}

export default Filters;
