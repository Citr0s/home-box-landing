namespace home_box_landing.api.Core.Types
{
    public class Error
    {
        public int Code { get; set; }
        public string UserMessage { get; set; }
        public string TechnicalMessage { get; set; }
    }
}