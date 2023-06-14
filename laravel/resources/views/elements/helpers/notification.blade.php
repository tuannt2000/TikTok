<div class="position-fixed top-0 w-100">
    @if (Session::get('flashError'))
    <div class="alert alert-danger alert-ps" role="alert">
        {{ Session::get('flashError') }}
    </div>
    @endif;
</div>