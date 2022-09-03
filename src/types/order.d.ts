type Order = {
  id?: string;
  status: 'active' | 'complete';
  user_id: string;
};
export default Order;
