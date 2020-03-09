using System;

namespace LunchPicker.API
{
    public class ApplicationException : Exception
    {
        public ErrorCode ErrorCode { get; }

        public ApplicationException(ErrorCode errorCode, string message)
            : base(message)
        {
            ErrorCode = errorCode;
        }
    }
}