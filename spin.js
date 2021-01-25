/*
Language: Spin/Spin2
Author: Ada Gottensträter
Description: highlight.js language definition for Spin/Spin2 files
Version: 1.1
Licensed as whatever you want it to be.
*/
"use strict";

{
    const COMMENT_MODE = hljs.COMMENT('\'', '$');
    const DOCCOMMENT_MODE = hljs.COMMENT('\'\'', '$');
    const BLOCKCOMMENT_MODE = hljs.COMMENT('{', '}');
    const BLOCKDOCCOMMENT_MODE = hljs.COMMENT('{{', '}}');
    const BLOCKTYPES = 'con obj var pub pri dat ';
    const P1_SPECIAL_CONS = '_CLKMODE _XINFREQ _CLKFREQ _FREE _STACK ';
    const P2_SPECIAL_CONS = '_XINFREQ _CLKFREQ _XTLFREQ _ERRFREQ _RCSLOW _RCFAST _FREE _STACK ';
    const WIDTHS = 'byte word long '; 
    const SPIN_KEYWORDS = 'if ifnot else elseif elseifnot repeat from to step while until case other return abort result '; // Keywords valid in Spin code (PUB/PRI blocks)
    const SPIN1_KEYWORDS = SPIN_KEYWORDS;
    const SPIN2_KEYWORDS = SPIN_KEYWORDS + 'case_fast reg ';
    const PASM_KEYWORDS =   'wc wz org res fit '+
                            'if_a if_ae if_always if_b if_be if_c if_c_and_nz if_c_and_z if_c_eq_z if_c_ne_z if_c_or_nz if_c_or_z if_e '+
                            'if_nc if_nc_and_nz if_nc_and_z if_nc_or_nz if_nc_or_z if_ne if_nz if_nz if_nz_and_c if_nz_and_nc if_nz_or_c if_nz_or_nc '+
                            'if_z if_z_and_c if_z_and_nc if_z_eq_c if_z_ne_c if_z_or_c if_z_or_nc ';
    const PASM1_KEYWORDS = PASM_KEYWORDS + 'wr nr if_never ';
    const PASM2_KEYWORDS = PASM_KEYWORDS +  'end _ret_ wcz orc orz andc andz xorc xorz '+
                                            'if_00 if_not_00 if_01 if_not_01 if_10 if_not_10 if_11 if_not_11 ';
    const GENERIC_BUILTINS = 'float trunc round and or not '; // builtins valid everywhere
    const SPIN_BUILTINS =   'bytefill wordfill longfill bytemove wordmove longmove strsize strcomp lookup lookupz lookdown lookdownz'+ // Spin builtin functions
                            'waitcnt waitpeq waitpne waitvid cogid coginit cogstop locknew lockret clkfreq clkmode clkset '; 
    const SPIN1_BUILTINS = SPIN_BUILTINS + 'lockset lockclr cognew '
    const SPIN2_BUILTINS = SPIN_BUILTINS +  'hubset cogspin cogchk locktry lockrel lockchk cogatn pollatn waitatn getct pollct waitct waitus waitms getsec getms call regexec regload'+
                                            'pinw pinwrite pinl pinlow pinh pinhigh pint pintoggle pinf pinfloat pinr pinread pinstart pinclear wrpin wxpin wypin akpin rdpin rqpin '+
                                            'rotxy polxy xypol qsin qcos muldiv64 getrnd getregs setregs varbase '+
                                            'abs encod decod bmask ones sqrt qlog qexp sar rol rev zerox signx sca scas frac addbits addpins ';
    const SPIN_BUILTINS_SPECIAL = 'constant string '; // special builtins
    const GENERIC_LITERALS = 'true false posx negx pi ';
    const P1_LITERALS = 'xtal1 xtal2 xtal3 xinput rcfast rcslow pll1x pll2x pll4x pll8x pll16x ';
    const P1_REGISTERS = 'par cnt ina inb outa outb dira dirb ctra ctrb frqa frqb phsa phsb vcfg vscl '; // Registers for P8X32A
    const P1_MNEMONICS =    'abs absneg add addabs adds addsx addx and andn call clkset cmp cmps cmpsub cmpsx cmpx cogid coginit cogstop djnz hubop jmp jmpret '+
                            'lockclr locknew lockret lockset max maxs min mins mov movd movi movs muxc muxnc muxz muxnz neg negc negnc negz negnz nop or '+
                            'rcl rcr rdbyte rdword rdlong ret rev rol ror sar shl shr sub subabs subs subsx subx sumc sumnc sumz sumnz test testn tjnz tjz '+
                            'waitcnt waitpeq waitpne waitvid wrbyte wrlong wrword xor ';

    
    const P2_LITERALS = 'cogexec hubexec cogexec_new hubexec_new cogexec_new_pair hubexec_new_pair newcog '+
                        'event_int int_off event_ct1 event_ct2 event_ct3 event_se1 event_se2 event_se3 event_se4 event_pat event_fbw event_xmt event_xfi event_xro event_xrl event_atn event_qmt '+
                        'p_true_a p_invert_a p_local_a p_plus1_a p_plus2_a p_plus3_a p_outbit_a p_minus3_a p_minus2_a p_minus1_a '+
                        'p_true_b p_invert_b p_local_b p_plus1_b p_plus2_b p_plus3_b p_outbit_b p_minus3_b p_minus2_b p_minus1_b '+
                        'p_pass_ab p_and_ab p_or_ab p_xor_ab p_filt0_ab p_filt1_ab p_filt2_ab p_filt3_ab '+
                        'p_logic_a p_logic_a_fb p_logic_b_fb p_schmitt_a p_schmitt_a_fb p_schmitt_b_fb p_compare_ab p_compare_ab_fb '+
                        'p_adc_gio p_adc_vio p_adc_float p_adc_1x p_adc_3x p_adc_10x p_adc_30x p_adc_100x '+
                        'p_dac_990r_3v p_dac_600r_2v p_dac_124r_3v p_dac_75r_2v '+
                        'p_level_a p_level_a_fbn p_level_b_fbp p_level_b_fbn '+
                        'p_async_io p_sync_io p_true_in p_invert_in p_true_output p_invert_output '+
                        'p_high_fast p_high_1k5 p_high_15k p_high_150k p_high_1ma p_high_100ua p_high_10ua p_high_float '+
                        'p_low_fast p_low_1k5 p_low_15k p_low_150k p_low_1ma p_low_100ua p_low_10ua p_low_float '+
                        'p_tt_00 p_tt_01 p_tt_10 p_tt_11 p_oe p_channel p_bitdac '+
                        'p_normal p_repository p_dac_noise p_dac_dither_rnd p_dac_dither_pwm p_pulse p_transition '+
                        'p_nco_freq p_nco_duty p_pwm_triangle p_pwm_sawtooth p_pwm_smps p_quadrature p_reg_up p_reg_up_down '+
                        'p_count_rises p_count_highs p_state_ticks p_high_ticks p_events_ticks p_periods_ticks p_periods_highs '+
                        'p_counter_ticks p_counter_highs p_counter_periods p_adc p_adc_ext p_adc_scope p_usb_pair p_sync_tx p_sync_rx p_async_tx p_async_rx '+
                        'x_imm_32x1_lut x_imm_16x2_lut x_imm_8x4_lut x_imm_4x8_lut x_imm_32x1_1dac1 x_imm_16x2_2dac1 x_imm_16x2_1dac2 x_imm_8x4_4dac1 x_imm_8x4_2dac2 x_imm_8x4_1dac4 '+
                        'x_imm_4x8_4dac2 x_imm_4x8_2dac4 x_imm_4x8_1dac8 x_imm_2x16_4dac4 x_imm_2x16_2dac8 x_imm_1x32_4dac8 '+
                        'x_rflong_32x1_lut x_rflong_16x2_lut x_rflong_8x4_lut x_rflong_4x8_lut x_rfbyte_1p_1dac1 x_rfbyte_2p_2dac1 x_rfbyte_2p_1dac2 x_rfbyte_4p_4dac1 '+
                        'x_rfbyte_4p_2dac2 x_rfbyte_4p_1dac4 x_rfbyte_8p_4dac2 x_rfbyte_8p_2dac4 x_rfbyte_8p_1dac8 x_rfword_16p_4dac4 x_rfword_16p_2dac8 x_rflong_32p_4dac8 '+
                        'x_rfbyte_luma8 x_rfbyte_rgbi8 x_rfbyte_rgb8 x_rfword_rgb16 x_rflong_rgb24 '+
                        'x_1p_1dac1_wfbyte x_2p_2dac1_wfbyte x_2p_1dac2_wfbyte x_4p_4dac1_wfbyte x_4p_2dac2_wfbyte x_4p_1dac4_wfbyte x_8p_4dac2_wfbyte x_8p_2dac4_wfbyte x_8p_1dac8_wfbyte '+
                        'x_16p_4dac4_wfword x_16p_2dac8_wfword x_32p_4dac8_wflong   x_1adc8_0p_1dac8_wfbyte x_1adc8_8p_2dac8_wfword x_2adc8_0p_2dac8_wfword x_2adc8_16p_4dac8_wflong x_4adc8_0p_4dac8_wflong '+
                        'x_dds_goertzel_sinc1 x_dds_goertzel_sinc2 '+
                        'x_dacs_off x_dacs_0_0_0_0 x_dacs_x_x_0_0 x_dacs_0_0_x_x x_dacs_x_x_x_0 x_dacs_x_x_0_x x_dacs_x_0_x_x x_dacs_0_x_x_x x_dacs_0n0_0n0 x_dacs_x_x_0n0 '+
                        'x_dacs_0n0_x_x x_dacs_1_0_1_0 x_dacs_x_x_1_0 x_dacs_1_0_x_x x_dacs_1n1_0n0 x_dacs_3_2_1_0 '+
                        'x_pins_off x_pins_on x_write_off x_write_on x_alt_off x_alt_on ';

    const P2_REGISTERS =    'ijmp3 iret3 ijmp2 iret2 ijmp1 iret1 pa pb ptra ptrb dira dirb outa outb ina inb '+
                            'pr0 pr1 pr2 pr3 pr4 pr5 pr6 pr7 pr7';

    const P2_MNEMONICS =    'nop ror rol shr shl rcr rcl sar sal add addx adds addsx sub subx subs subsx cmp cmpx cmps cmpsx cmpr cmpm subr cmpsub fge fle fges fles sumc sumnc sumz sumnz '+
                            'testb testbn bitl bith bitc bitnc bitz bitnz bitrnd bitnot and andn or xor muxc muxnc muxz muxnz mov not abs neg negc negnc negz negnz '+
                            'incmod decmod zerox signx encod ones test testn setnib getnib rolnib setbyte getbyte rolbyte setword getword rolword altsn altgn altsb altgb altsw altgw altr altd alts altb alti '+
                            'setr setd sets decod bmask crcbit crcnib muxnits muxnibs muxq movbyts mul muls sca scas addpix mulpix blnpix mixpix addct1 addct2 addct3 wmlong rqpin rdpin rdlut rdbyte rdword rdlong '+
                            'popa popb calld resi3 resi2 resi1 resi0 reti3 reti2 reti1 reti0 callpa callpb djz djnz djf djnf ijz ijnz tjz tjnz tjf tjnf tjs tjns tjv '+
                            'jint jct1 jct2 jct3 jse1 jse2 jse3 jse4 jpat jfbw jxmt jxfi jxro jxrl jatn jqmt jnint jnct1 jnct2 jnct3 jnse1 jnse2 jnse3 jnse4 jnpat jnfbw jnxmt jnxfi jnxro jnxrl jnatn jnqmt '+
                            'setpat akpin wrpin wxpin wypin wrlut wrbyte wrword wrlong pusha pushb rdfast wrfast fblock xinit xstop xzero xcont rep coginit qmul qdiv qfrac qsqrt qrotate qvector hubset '+
                            'cogid cogstop locknew lockret locktry lockrel qlog qexp rfbyte rfword rflong rfvar rfvars wfbyte wfword wflong getqx getqy getct getrnd  getrnd   setdacs setxfrq getxacc '+
                            'waitx setse1 setse2 setse3 setse4 pollint pollct1 pollct2 pollct3 pollse1 pollse2 pollse3 pollse4 pollpat pollfbw pollxmt pollxfi pollxro pollxrl pollatn pollqmt '+
                            'waitint waitct1 waitct2 waitct3 waitse1 waitse2 waitse3 waitse4 waitpat waitfbw waitxmt waitxfi waitxro waitxrl waitatn allowi stalli '+
                            'trgint1 trgint2 trgint3 nixint1 nixint2 nixint3 setint1 setint2 setint3 setq setq2 push pop jmp call ret calla reta callb retb jmprel '+
                            'skip skipf execf getptr getbrk cogbrk brk setluts setcy setci setcq setcfrq setcmod setpiv setpix cogatn testp testpn '+
                            'dirl dirh dirc dirnc dirz dirnz dirrnd dirnot outl outh outc outnc outz outnz outrnd outnot fltl flth fltc fltnc fltz fltnz fltrnd fltnot '+
                            'drvl drvh drvc drvnc drvz drvnz drvrnd drvnot splitb mergeb splitw mergew seussf seussr rgbsqz rgbexp xoro32 rev rczr rczl wrc wrnc wrz wrnz modcz modc modz '+
                            'setscp getscp call calla callb calld loc augs augd';

    const STRINGS = {
        className: 'string',
        begin: '"',
        end: '"'
    }
    const PREPROCESSOR = {
        className: 'meta',
        begin: /^\s*#[a-z]+\b/,
        end: /$/,
        keywords: {
            'meta-keyword':
                'if else elif endif define undef warning error line print region end ' +
                'pragma ifdef ifndef elseifdef elseifndef include '
        },
        contains: [
            {
                begin: /\\\n/,
                relevance: 0
            },
            hljs.inherit(STRINGS, {
                className: 'meta-string'
            }),
            {
                className: 'meta-string',
                begin: /<.*?>/,
                end: /$/,
                illegal: '\\n'
            },
            COMMENT_MODE,DOCCOMMENT_MODE,BLOCKCOMMENT_MODE,BLOCKDOCCOMMENT_MODE
        ]
    };
    const NUMBERS = {
        className: 'number',
        variants: [
            { // base 2
                begin: /(?<!\w)\%[01_]+(?!\w)/
            },
            { // base 4
                begin: /(?<!\w)\%%[0123_]+(?!\w)/,
                relevance: 10, // Rather unique spin-ism
            },
            { // base 16
                begin: /(?<!\w)\$[0-9A-Fa-f_]+(?!\w)/
            },
            { // base 10
                begin: /(?<!\w)[0-9_]+(?!\w)/
            },
        ],
    };


    const SPIN1_FUNCTIONS = {
        className: 'function',
        begin: /^\s*(pub|pri)\s+/i,
        end: /$/,
        keywords: BLOCKTYPES,
        contains: [
            {
                className: 'title',
                begin: /(?<=^\s*(pub|pri)\s+)/i,
                end: /(?!\w)/,
                contains: [COMMENT_MODE,DOCCOMMENT_MODE,BLOCKCOMMENT_MODE,BLOCKDOCCOMMENT_MODE],
            },
            {
                className: 'params',
                begin: /(?<=^\s*(pub|pri)\s+\w+\s*)\((?!\))/i, // Does not match Spin2-style "PUB name()" !!!
                end: /\)/,
                illegal: /[{}\[\]]/,
                contains: [COMMENT_MODE,DOCCOMMENT_MODE,BLOCKCOMMENT_MODE,BLOCKDOCCOMMENT_MODE],
            },
            {
                className: 'resultvar',
                begin: /(?<=^\s*(pub|pri)\s+\w+\s*(\(.+\))?\s*\:\s*)\w/i,
                end: /($|\w(?![\w,]))/,
                illegal: /[,;><]/,
                contains: [COMMENT_MODE,DOCCOMMENT_MODE,BLOCKCOMMENT_MODE,BLOCKDOCCOMMENT_MODE],
            },
            {
                className: 'locals',
                begin: /(?<=^\s*(pub|pri)\s+\w+\s*(\(.+\))?\s*(:.*)?\|\s*)\w/i,
                end: /$/,
                //illegal: /(byte|word|long)/,
                contains: [COMMENT_MODE,DOCCOMMENT_MODE,BLOCKCOMMENT_MODE,BLOCKDOCCOMMENT_MODE],
                keywords: {
                    built_in: GENERIC_BUILTINS,
                    literal: GENERIC_LITERALS + P1_LITERALS,
                }
            },
            COMMENT_MODE,DOCCOMMENT_MODE,BLOCKCOMMENT_MODE,BLOCKDOCCOMMENT_MODE,
        ],
        illegal: /\(\)/,
    }

        
    const SPIN2_FUNCTIONS = {
        className: 'function',
        begin: /^\s*(pub|pri)\s+(?=\w+\s*\()/i, // Does not match Spin1-style "PUB name" !!!
        end: /$/,
        keywords: BLOCKTYPES,
        contains: [
            {
                className: 'title',
                begin: /(?<=^\s*(pub|pri)\s+)/i,
                end: /(?!\w)/,
                contains: [COMMENT_MODE,DOCCOMMENT_MODE,BLOCKCOMMENT_MODE,BLOCKDOCCOMMENT_MODE],
            },
            {
                className: 'params',
                begin: /(?<=^\s*(pub|pri)\s+\w+\s*)\(/i,
                end: /\)/,
                illegal: /[{}\[\]]/,
                contains: [COMMENT_MODE,DOCCOMMENT_MODE,BLOCKCOMMENT_MODE,BLOCKDOCCOMMENT_MODE],
            },
            {
                className: 'resultvar',
                begin: /(?<=^\s*(pub|pri)\s+\w+\s*(\(.*\))?\s*\:\s*)\w/i,
                end: /($|\w(?![\w,]))/,
                contains: [COMMENT_MODE,DOCCOMMENT_MODE,BLOCKCOMMENT_MODE,BLOCKDOCCOMMENT_MODE],
            },
            {
                className: 'locals',
                begin: /(?<=^\s*(pub|pri)\s+\w+\s*(\(.*\))?\s*(:.*)?\|\s*)\w/i,
                end: /($|\w(?![\w,]))/,
                contains: [COMMENT_MODE,DOCCOMMENT_MODE,BLOCKCOMMENT_MODE,BLOCKDOCCOMMENT_MODE],
                keywords: {
                    keyword : WIDTHS,
                    built_in: GENERIC_BUILTINS,
                    literal: GENERIC_LITERALS + P2_LITERALS,
                }
            },
            COMMENT_MODE,DOCCOMMENT_MODE,BLOCKCOMMENT_MODE,BLOCKDOCCOMMENT_MODE,
        ],
        illegal: /\(\)/,
    }


    hljs.registerLanguage("spin",function(hljs){return{
        aliases: ["spin"],
        case_insensitive: true,
        keywords: { // Initial block is CON...
            keyword: BLOCKTYPES + P1_SPECIAL_CONS + WIDTHS + SPIN1_KEYWORDS + PASM1_KEYWORDS + P1_REGISTERS,
            built_in: GENERIC_BUILTINS + SPIN_BUILTINS + SPIN_BUILTINS_SPECIAL + P1_MNEMONICS,
            literal: GENERIC_LITERALS + P1_LITERALS,
        },
        contains: [COMMENT_MODE,DOCCOMMENT_MODE,BLOCKCOMMENT_MODE,BLOCKDOCCOMMENT_MODE,PREPROCESSOR,STRINGS,NUMBERS,SPIN1_FUNCTIONS],
    }});

    hljs.registerLanguage("spin2",function(hljs){return{
        aliases: ["spin2"],
        case_insensitive: true,
        keywords: { // Initial block is CON...
            keyword: BLOCKTYPES + P2_SPECIAL_CONS + WIDTHS + SPIN2_KEYWORDS + PASM2_KEYWORDS + P2_REGISTERS,
            built_in: GENERIC_BUILTINS + SPIN_BUILTINS + SPIN_BUILTINS_SPECIAL + P2_MNEMONICS,
            literal: GENERIC_LITERALS + P2_LITERALS,
        },
        contains: [COMMENT_MODE,DOCCOMMENT_MODE,BLOCKCOMMENT_MODE,BLOCKDOCCOMMENT_MODE,PREPROCESSOR,STRINGS,NUMBERS,SPIN2_FUNCTIONS],
    }});
}

