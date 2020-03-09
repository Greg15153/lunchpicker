namespace LunchPicker.API
{
    public class Result<TOk, TErr>
    {
        public Result(TOk ok)
        {
            Value = ok;
        }

        public Result(TErr err)
        {
            Error = err;
        }

        public TOk Value { get; private set; }

        public TErr Error { get; private set; }

        public bool IsOk => Value != null;

        public bool IsError => Error != null;
    }
}